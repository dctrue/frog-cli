/**
 * Created by jlw on 2016/10/11.
 */

const Metalsmith = require('metalsmith')
const path = require('path')
const inquirer = require('inquirer')
const async = require('async')
const Handlebars = require('handlebars')
const match = require('minimatch')
const moment = require('moment')
const Promise = require('bluebird')

const getOptions = require('./getOptions')

function setDefaultData(files, metalsmith, done){
	const data = metalsmith.metadata()
    //加入时间
    data.date = moment().format('YYYY/MM/DD')
    data.time = moment().format('HH:MM:SS')
    done()
}

/**
 * 模板转换
 * @param {object} files 文件列表
 * @param {object} metalsmith 替换数据
 * @param {function} done 回调函数
 */
function renderTemplateFiles (files, metalsmith, done) {
    const keys = Object.keys(files)
    const metalsmithMetadata = metalsmith.metadata()
    async.each(keys, function (file, next) {
        const str = files[file].contents.toString()

        if (!/{{([^{}]+)}}/g.test(str)) {
            return next()
        }
		const tmpl = Handlebars.compile(str)
		const res = tmpl(metalsmithMetadata)

        files[file].contents = new Buffer(res)
        next()
    }, done)
}

/**
 * 终端对话
 * @param {object} prompts 问题列表
 * @returns {Function}
 */
function askQuestion(prompts){
    return function(files, metalsmith, done){
        const data = metalsmith.metadata()
        async.eachSeries(Object.keys(prompts), function(key, next){
            //TODO: 设置默认项 如 author的name email
            const prompt = prompts[key]
            if(!!prompt.when && !data[prompt.when]){
                data[key] = false
                next()
            }else{
                inquirer.prompt([{
                    type:prompt.type,
                    name:key,
                    message:prompt.message|| key,
                    default:prompt.default,
                    choices:prompt.choices || [],
                    validate:prompt.validate || function(){return true}
                }]).then(function(answers){
                    data[key] = answers[key]
                    next()
                })
            }
        }, done)
    }
}

/**
 * 文件过滤
 * @param {object} prompts 问题列表
 * @returns {Function}
 */
function fileFilter(filters){
    return function (files, metalsmith, done){
        if(!filters) done()
        else{
            const data = metalsmith.metadata()
            filters = filters || {}
			const fileNames = Object.keys(files)
            Object.keys(filters).forEach(function(g){
                fileNames.forEach(function(file){
                    if(match(file, g, { dot: true })){
                        if(!evalualte(filters[g], data)){
                            delete files[file]
                        }
                    }
                })
            })
            done()
        }
    }
}

function evalualte(exp, data) {
    if('boolean' === typeof exp) return exp
    const fn = new Function('data', 'with (data) { return ' + exp + '}')
    try {
        return fn(data)
    } catch (e) {
        console.error('Error when evaluating filter condition: ' + exp)
    }
}

function successMessage(message, data){
    if(!message || typeof message !== 'string') return

    const tmpl = Handlebars.compile(message)
    const res = tmpl(data)
    console.log('\n' + res.split(/\r?\n/g).map(function (line) {
        return '   ' + line
    }).join('\n'))
}

/**
 * 模板生成
 * @param {string} name 项目名称
 * @param {string} src 项目模板源目录
 * @param {string} dest 模板生成目标目录
 */
const generate = (name, src, dest) => {

	const options = getOptions(name, src)
	const metalsmith = Metalsmith(path.join(src, 'template'))
	const data = {
		destDirName:name
	}
	//注册handlebars的帮助函数
	options.helpers && Object.keys(options.helpers).map(function (key) {
		Handlebars.registerHelper(key, options.helpers[key])
	})

	return new Promise((resolve, reject) => {
		metalsmith
			.ignore('**/node_modules')
			.use(askQuestion(options.prompts))
			.use(setDefaultData)
			.use(fileFilter(options.filters))
			.use(renderTemplateFiles)
			.clean(false)
			.source('.')
			.destination(dest)
			.build(function(err){
				if(err) {
					reject(err)
				}
				else {
					successMessage(options.successMessage, data)
					resolve()
				}
			})
	})
}

module.exports = generate;
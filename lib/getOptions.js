/**
 * Created by jlw on 2016/10/11.
 */

const metadata = require('read-metadata')
const exists = require('fs').existsSync
const path = require('path')
const helper = require('./helper')

/**
 * 获取标签信息
 * @param {string} dir 项目目录
 * @returns {object} 标签信息
 */
const getMetadata = dir => {
    const json = path.join(dir, 'meta.json')
    const js = path.join(dir, 'meta.js')
    let opts = {}

    if(exists(json)) {
        opts = metadata.sync(json)
    } else if (exists(js)) {
        const req = require(path.resolve(js))
        if(req !== Object(req)) {
            throw new Error('meta.js needs to expose an object')
        }
        opts = req
    }

    return opts
}

/**
 *
 * @param {object} source 设置源
 * @param {string} key 键名
 * @param {string} value 键值
 */
const setDefault = (source, key, value) => {
    const prompts = source.prompts || (source.prompts = {})
    if(!prompts[key] || typeof prompts[key] !== 'object') {
        prompts[key] = {
            type: 'string',
            default: value
        }
    }else {
        prompts[key]['default'] = value
    }
}

/**
 * 从meta.js或者meta.json获取模板标签信息
 * @param {string} name 项目名
 * @param {string} dir 项目目录
 * @returns {object} 标签信息
 */
const getOptions = (name, dir) => {

	const opts = getMetadata(dir)
	const author = helper.gitUser()

	setDefault(opts, 'name', name)
	if(author){
		setDefault(opts, 'author', author)
	}
	return opts
}

module.exports = getOptions
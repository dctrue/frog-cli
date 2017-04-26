/**
 * Created by jlw on 2016/10/18.
 */

const should = require('should')
const inquirer = require('inquirer')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const rm = require('rimraf').sync
const generate = require('../lib/generate')

const MOCK_META_TEMPLATE_PATH = './test/mock-data/mock-template'
const MOCK_META_TEMPLATE_DEST_PATH = path.resolve('./test/mock-data/mock-template-dest')
const MOCK_META_JS_PATH = './test/mock-data/mock-meta-js'
const MOCK_META_JS_DEST_PATH = path.resolve('./test/mock-data/mock-meta-js-dest')

function inquirerPromptReFN(answers){
    inquirer.prompt = (questions) => {
        return new Promise((resolve) => {
            const key = questions[0].name
            const _answers = {}
            const validate = questions[0].validate
            const valid = validate(answers[key])
            if (valid !== true) {
                throw new Error(valid)
            }
            _answers[key] = answers[key]
            resolve(_answers)
        })
    }
}

describe('template generate', () => {
    const answers = {
        name: 'test',
        author: 'jlw <jlw@gmail.com>',
        description: 'nd uedc template test'
    }

    it('helper', (done) => {
        inquirerPromptReFN(answers)
        generate('test', MOCK_META_JS_PATH, MOCK_META_JS_DEST_PATH)
			.then(() => {
				const content = fs.readFileSync(`${MOCK_META_JS_DEST_PATH}/README.md`, 'utf-8')
				content.should.be.equal(answers.name.toUpperCase())
				rm(MOCK_META_JS_DEST_PATH)
			})
			.finally(() => {
        		done()
			})
    })

    it('generate', (done) => {
        inquirerPromptReFN(answers)
        generate('test', MOCK_META_TEMPLATE_PATH, MOCK_META_TEMPLATE_DEST_PATH)
			.then(() => {
				const exists = fs.existsSync(path.join(MOCK_META_TEMPLATE_DEST_PATH, 'node_modules'))
				exists.should.not.be.ok()
				rm(MOCK_META_TEMPLATE_DEST_PATH)
			})
			.finally(() => {
				done()
			})
    })
})

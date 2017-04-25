
"use strict"

const config = require('../config')
const BaseAPI = require('../lib/gitapi/BaseAPI')
require('should')

const MOCK_TEMPLATENAME = 'template_test'
const MOCK_TEMPLATENAME_BRANCH = '0.1.0'

describe('BaseAPI test', () => {

	let baseAPI = null

	before(() => {
		baseAPI = new BaseAPI()
	})

	it('#parseTemplate', () => {
		const t1 = baseAPI.parseTemplate(MOCK_TEMPLATENAME)
		t1.should.have.property('remote', `${config.git.templateGroup}/${MOCK_TEMPLATENAME}`)
		t1.should.have.property('branch', 'master')

		const t2 = baseAPI.parseTemplate(`${MOCK_TEMPLATENAME}#${MOCK_TEMPLATENAME_BRANCH}`)
		t2.should.have.property('remote', `${config.git.templateGroup}/${MOCK_TEMPLATENAME}`)
		t2.should.have.property('branch', MOCK_TEMPLATENAME_BRANCH)
	})

})
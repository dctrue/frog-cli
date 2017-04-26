
"use strict"

const config = require('../config')
const GitLabUEDC = require('../lib/repertory/GitLabUEDC')
const privateToken = require('../lib/privateToken')

const del = require('del')
const should = require('should')

const gitLabUEDC = new GitLabUEDC()

const MOCK_TEMPLATE_NAME = 'simple-pc'
const MOCK_DOWNLOAD_DEST = './.temp'

describe('#GitLabUEDC test', () => {

	let originalToken = null

	before(() => {
		// 保存原先的private token
		originalToken = privateToken.getToken()
		privateToken.setToken('GxwCYpeQxq9_EHEkrh-M')
	})

	after(() => {
		privateToken.setToken(originalToken)
	})

	it('should download successfully', done => {
		gitLabUEDC.downloadTemplate(MOCK_TEMPLATE_NAME, MOCK_DOWNLOAD_DEST)
			.then(status => {
				status.should.be.ok()
				del(MOCK_DOWNLOAD_DEST)
				done()
			})
			.catch(err => {
				done()
			})
	})

	it('should return a template list', done => {
		gitLabUEDC.templateList()
			.then(templates => {
				templates.should.be.an.instanceOf(Array)
				templates.forEach(template => {
					template.should.have.property('name')
					template.should.have.property('description')
				})
				done()
			})
			.catch(err => {
				done()
			})
	})

})
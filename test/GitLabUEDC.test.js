
"use strict"

const should = require('should')
const muk = require('muk')
const Promise = require('bluebird')

const config = require('../config')
const privateToken = require('../lib/privateToken')

describe('#GitLabUEDC test', () => {

	const MOCK_TEMPLATE_NAME = 'simple-pc'
	const MOCK_DOWNLOAD_DEST = './.temp'

	class MockGitlabDownload {
		constructor() {}

		download(opts) {
			return new Promise((resolve, reject) => {
				if(opts.remote.indexOf(MOCK_TEMPLATE_NAME) == -1) {
					reject(new Error())
				}else {
					resolve(true)
				}
			})
		}
	}

	const mockRequest = () => {
		return new Promise((resolve) => {
			resolve({
				projects: [
					{
						name: 'name',
						description: 'description'
					}
				]
			})
		})
	}

	const GitLabUEDC = muk('../lib/repertory/GitLabUEDC', {
		'gitlab-download': MockGitlabDownload,
		request: mockRequest
	})
	const gitLabUEDC = new GitLabUEDC()

	describe('#GitLabUEDC downloadTemplate() test', () => {

		it('should download successfully when given a exist template in gitlab', done => {

			gitLabUEDC.downloadTemplate(MOCK_TEMPLATE_NAME, MOCK_DOWNLOAD_DEST)
				.should.be.fulfilled()
				.then(status => {
					status.should.be.equal(true)
					done()
				})
				.catch(err => {
					should.not.exist(err)
					done()
				})
		})

		it('should download failed when given a none exist template in gitlab', done => {

			gitLabUEDC.downloadTemplate('other-anytemplate', MOCK_DOWNLOAD_DEST)
				.should.be.rejected()
				.then(status => {
					should.not.exist(status)
					done()
				})
				.catch(err => {
					should.exist(err)
					done()
				})
		})

	})

	describe('#GitLabUEDC templateList() test', () => {

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
					should.not.exist(err)
					done()
				})
		})

	})

})
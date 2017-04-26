
"use strict"

const config = require('../config')
const RepoBase = require('../lib/repertory/RepoBase')
const should = require('should')

const repoBase = new RepoBase()

const MOCK_TEMPLATE_NAME = 'simple'
const MOCK_TEMPLATE_BRANCH = '1.0.0'

describe('#RepoBase test', () => {

	it('should throw error when downloadTemplate() method called', () => {
		(() => { repoBase.downloadTemplate() }).should.throw()
	})

	it('should throw error when templateList() method called', () => {
		(() => { repoBase.templateList() }).should.throw()
	})

	describe('RepoBase static parseTemplateArg() test', () => {

		it('should return the right object when called with template name', () => {
			const template = RepoBase.parseTemplateArg(MOCK_TEMPLATE_NAME)
			template.should.have.property('remote', `${config.repertory.templateGroup}/${MOCK_TEMPLATE_NAME}`)
			template.should.have.property('branch', 'master')
		})

		it('should return the right object when called with template#branch', () => {
			const template = RepoBase.parseTemplateArg(`${MOCK_TEMPLATE_NAME}#${MOCK_TEMPLATE_BRANCH}`)
			template.should.have.property('remote', `${config.repertory.templateGroup}/${MOCK_TEMPLATE_NAME}`)
			template.should.have.property('branch', MOCK_TEMPLATE_BRANCH)
		})

		it('should return the right object when called with remotepath/template#branch', () => {
			const template = RepoBase.parseTemplateArg(`${config.repertory.templateGroup}/${MOCK_TEMPLATE_NAME}#${MOCK_TEMPLATE_BRANCH}`)
			template.should.have.property('remote', `${config.repertory.templateGroup}/${MOCK_TEMPLATE_NAME}`)
			template.should.have.property('branch', MOCK_TEMPLATE_BRANCH)
		})

	})

})
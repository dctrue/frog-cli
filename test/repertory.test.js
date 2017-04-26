
"use strict"

const repertory = require('../lib/repertory')
const GitLabUEDC = require('../lib/repertory/GitLabUEDC')
const should = require('should')

describe('#repertory test', () => {

	it('should be throw error when repertory bridge not found', () => {
		(() => { repertory('anything') }).should.throw()
	})

	it('should be return an right repertory instance', () => {
		repertory('GitLabUEDC').should.be.an.instanceof(GitLabUEDC)
	})

})
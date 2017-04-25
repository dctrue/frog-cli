
"use strict"

const GitAPI = require('../lib/GitAPI')
const GitAPIUEDC = require('../lib/gitapi/Gitlab-uedc')
require('should')

describe('GitAPI test', () => {

	// TODO: 异常测试
	// it('should be throw error when api not found', () => {
	// 	GitAPI('apitest').should.throw()
	// })

	it('should be return an right instance', () => {
		GitAPI('Gitlab-uedc').should.be.an.instanceof(GitAPIUEDC)
	})

})
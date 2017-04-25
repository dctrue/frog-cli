
"use strict"

const fs = require('fs')
const path = require('path')
require('should')

const privateToken = require('../lib/privateToken')
const config = require('../config')

const MOCK_TOKEN_VALUE = 'token-test'

describe('private token test', () => {

	let token = null
	const tokenUrl = path.resolve(__dirname, path.join('../', `${config.tokenDB}/${config.tokenDBKey}`))

	before(() => {
		// 保存原先的private token
		if(fs.existsSync(tokenUrl)){
			token = fs.readFileSync(tokenUrl)
		}
	})

	after(() => {
		// 恢复private token
		if(token){
			fs.writeFileSync(tokenUrl, token)
		}
	})

	it('set private token', () => {
		privateToken.set(MOCK_TOKEN_VALUE)
		const value = fs.readFileSync(tokenUrl).toString()
		value.should.be.eql(MOCK_TOKEN_VALUE)
	})

	it('get private token', () => {
		const value = privateToken.get()
		value.should.be.eql(MOCK_TOKEN_VALUE)
	})

	it('remove private token', () => {
		privateToken.remove()
		fs.existsSync(tokenUrl).should.not.be.ok()
	})

	it('check private token is empty', () => {
		privateToken.set(MOCK_TOKEN_VALUE)
		privateToken.isEmpty().should.not.be.ok()

		privateToken.remove()
		privateToken.isEmpty().should.be.ok()
	})


})

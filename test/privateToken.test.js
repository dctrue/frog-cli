
"use strict"

const fs = require('fs')
const path = require('path')
const should = require('should')

const privateToken = require('../lib/privateToken')
const config = require('../config')

const MOCK_TOKEN_VALUE = 'token-test'

describe('#privateToken test', () => {

	let originalToken = null
	const tokenUrl = path.resolve(__dirname, path.join('../', `${config.tokenDB}/${config.tokenDBKey}`))

	before(() => {
		// 保存原先的private token
		if(fs.existsSync(tokenUrl)){
			originalToken = fs.readFileSync(tokenUrl)
		}
	})

	after(() => {
		// 恢复private token
		if(originalToken){
			fs.writeFileSync(tokenUrl, originalToken)
		}
	})

	beforeEach(() => {
		if(fs.existsSync(tokenUrl)){
			fs.unlinkSync(tokenUrl)
		}
	})

	it('should get a token after private token set', () => {
		privateToken.setToken(MOCK_TOKEN_VALUE)
		const value = fs.readFileSync(tokenUrl).toString()
		value.should.be.eql(MOCK_TOKEN_VALUE)
	})

	describe('#privateToken getToken() test', () => {

		it('should get an empty string when private token is not set yet', () => {
			const value = privateToken.getToken()
			value.should.be.eql('')
		})

		it('should get an private token after set', () => {
			privateToken.setToken(MOCK_TOKEN_VALUE)
			const value = privateToken.getToken()
			value.should.be.eql(MOCK_TOKEN_VALUE)
		})

	})

	it('should remove the private token file after private token removed', () => {
		privateToken.setToken(MOCK_TOKEN_VALUE)
		privateToken.remove()
		fs.existsSync(tokenUrl).should.not.be.ok()
	})

	describe('#privateToken isEmpty() test', () => {

		it('should return true when private token is empty', () => {
			privateToken.isEmpty().should.be.ok()
		})

		it('should return false after private token set', () => {
			privateToken.setToken(MOCK_TOKEN_VALUE)
			privateToken.isEmpty().should.not.be.ok()
		})

	})

})

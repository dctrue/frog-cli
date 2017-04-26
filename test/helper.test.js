
"use strict"

const helper = require('../lib/helper')
const should = require('should')

describe('#helper test', () => {

	describe('#helper checkNodeVersion test', () => {

		it('should return true when now node version is up to min version', () => {
			helper.checkNodeVersion('>=1.0.0').should.equal(true)
		})

		it('should return true when now node version is down to min version', () => {
			helper.checkNodeVersion('100.0.0').should.equal(false)
		})

	})

	describe('#helper checkFrogCliVersion test', () => {

		it('should return the lasted frog version when local frog version is old', (done) => {
			helper.checkFrogCliVersion('0.0.0')
				.then(res => {
					res.should.be.type('string')
					done()
				})
		})

		it('should return the false when local frog version is latest', (done) => {
			helper.checkFrogCliVersion('100.0.0')
				.then(res => {
					should.not.exist(res)
					done()
				})
		})

	})

	describe('#helper gitUser test', () => {

		it('should return username and email', () => {
			helper.gitUser().should.be.type('string')
		})

	})

})

"use strict"

const should = require('should')
const muk = require('muk')
const Promise = require('bluebird')

const mockRequest = () => {
	return new Promise((resolve) => {
		resolve({
			name: 'frog-cli',
			description: '',
			'dist-tags': { latest: '1.0.0' },
			versions: {}
		})
	})
}

const helper = muk('../lib/helper', {
	'request-promise': mockRequest
})

describe('#helper test:', () => {

	describe('#helper checkNodeVersion test', () => {

		it('should return true when now node version is up to min version', () => {
			helper.checkNodeVersion('>=1.0.0').should.equal(true)
		})

		it('should return true when now node version is down to min version', () => {
			helper.checkNodeVersion('100.0.0').should.equal(false)
		})

	})

	describe('#helper checkFrogCliVersion test', () => {

		it('should return the 1.0.0 version code when local frog version is old', (done) => {
			helper.checkFrogCliVersion('0.0.1')
				.should.be.fulfilled()
				.then(res => {
					res.should.be.equal('1.0.0')
					done()
				})
				.catch(err => {
					should.not.exist(err)
					done()
				})
		})

		it('should return the false when local frog version is 1.0.0', (done) => {
			helper.checkFrogCliVersion('1.0.0')
				.should.be.fulfilled()
				.then(res => {
					res.should.be.equal('')
					done()
				})
				.catch(err => {
					should.not.exist(err)
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
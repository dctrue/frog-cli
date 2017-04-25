
"use strict"

const config = require('../config')

const GitAPI = (gitType = config.git.type) => {

	let API = null

	try {
		API = require(`./gitapi/${gitType}`)
	} catch(e) {
		throw new Error(`Cant found git api "${gitType}" in project`)
	}

	return new API()

}

module.exports = GitAPI

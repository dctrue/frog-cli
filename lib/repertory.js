
"use strict"

const config = require('../config')

const repertory = (repertoryType = config.repertory.type) => {

	let Repo = null

	try {
		Repo = require(`./repertory/${repertoryType}`)
	} catch(e) {
		throw new Error(`Cant found repertory bridge "${repertoryType}" in frog-cli`)
	}

	return new Repo()

}

module.exports = repertory

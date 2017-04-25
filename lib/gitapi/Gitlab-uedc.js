
"use strict"

const BaseAPI = require('./BaseAPI')

const GitlabDownload = require('gitlab-download')
const request = require('request-promise')

const config = require('../../config')
const privateToken = require('../privateToken')

class GitAPI extends BaseAPI {

	constructor() {
		super()
	}

	/**
	 * 获取模板组信息
	 */
	templateGroup() {

		const opts = {
			uri: `${config.git.apiUrl}/groups/${config.git.templateGroup}`,
			headers: {
				'PRIVATE-TOKEN': privateToken.get()
			},
			json: true
		}

		return request(opts)

	}

	/**
	 * 下载模板
	 * @param templateName
	 * @param dest
	 */
	downloadRepo(templateName, dest) {

		const templateArg = this.parseTemplate(templateName)
		const gitlab = new GitlabDownload(config.git.host, privateToken.get())

		return gitlab.download({
			remote: templateArg.remote,
			dest: dest,
			ref: templateArg.branch
		})

	}

}

module.exports = GitAPI
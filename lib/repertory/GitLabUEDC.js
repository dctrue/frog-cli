
"use strict"

const RepoBase = require('./RepoBase')

const GitlabDownload = require('gitlab-download')
const request = require('request-promise')
const Promise = require('bluebird')

const privateToken = require('../privateToken')
class GitLabUEDC extends RepoBase {

	constructor() {
		super()
	}

	/**
	 * 下载模板
	 * @param templateName
	 * @param dest
	 */
	downloadTemplate(templateName, dest) {

		const templateArg = RepoBase.parseTemplateArg(templateName)
		const gitlab = new GitlabDownload(this.repertoryHost, privateToken.getToken())

		return gitlab.download({
			remote: templateArg.remote,
			dest: dest,
			ref: templateArg.branch
		})

	}

	/**
	 * 获取模板组信息
	 */
	templateList() {

		const opts = {
			uri: `${this.repertoryApiUrl}/groups/${this.templateGroup}`,
			headers: {
				'PRIVATE-TOKEN': privateToken.getToken()
			},
			json: true
		}

		return new Promise((resolve, reject) => {

			request(opts)
				.then(group => {
					resolve(group.projects)
				})
				.catch(err => {
					reject(err)
				})

		})

	}

}


module.exports = GitLabUEDC
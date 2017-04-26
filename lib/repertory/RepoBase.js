
const config = require('../../config')

class RepoBase {

	constructor() {
		this.repertoryHost = config.repertory.host
		this.repertoryApiUrl = config.repertory.apiUrl
		this.templateGroup = config.repertory.templateGroup
	}

	/**
	 * 下载模板，在子类中实现
	 */
	downloadTemplate() {
		throw new Error('method "downloadTemplate" must be implement')
	}

	/**
	 * 模板列表，在子类中实现
	 */
	templateList() {
		throw new Error('method "templateList" must be implement')
	}

	/**
	 * 解析传入的模板名称参数
	 * @param templateName
	 * @returns {{branch: string, remote: string}}
	 */
	static parseTemplateArg(templateName) {

		const templateArg = templateName.split('#')
		const branch = templateArg.length > 1 ? templateArg[1] : 'master'
		const remote = templateArg[0].split('/').length > 1 ? templateArg[0] : config.repertory.templateGroup + '/' + templateArg[0]

		return {
			branch,
			remote
		}

	}

}

module.exports = RepoBase
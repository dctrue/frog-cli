
const config = require('../../config')

class BaseAPI {

	constructor() {}

	downloadRepo() {
		throw new Error('method "downloadRepo" must be implement')
	}

	templateGroup() {
		throw new Error('method "allTemplates" must be implement')
	}

	/**
	 * 解析传入的模板名称参数
	 * @param templateName
	 * @returns {{branch: string, remote: string}}
	 */
	parseTemplate(templateName) {

		const templateArg = templateName.split('#')
		const branch = templateArg.length > 1 ? templateArg[1] : 'master'
		const remote = templateArg[0].split('/').length > 1 ? templateArg[0] : config.git.templateGroup + '/' + templateArg[0]

		return {
			branch,
			remote
		}

	}

}

module.exports = BaseAPI
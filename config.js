/**
 * Created by Administrator on 2017/4/24.
 */
"use strict"

const config = {
	tokenDB: './.db',
	tokenDBKey: 'private-token',
	git: {
		type: 'gitlab-uedc',
		host: 'http://git.uedc.nd.com.cn/',
		apiUrl: 'http://git.uedc.nd.com.cn/api/v3/',
		templateGroup: 'cube-templates'
	}
}

module.exports = config
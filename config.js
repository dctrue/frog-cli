/**
 * Created by Administrator on 2017/4/24.
 */
"use strict"

const config = {
	tokenDB: './.db',
	tokenDBKey: 'private-token',
	repertory: {
		type: 'GitLabUEDC',
		host: 'http://git.sdp.nd/',
		apiUrl: 'http://git.sdp.nd/api/v3/',
		templateGroup: 'cube-templates'
	}
}

module.exports = config
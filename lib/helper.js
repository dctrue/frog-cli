
"use strict"

const Promise = require('bluebird')
const request = require('request-promise')
const exec = require('child_process').execSync

/**
 * 解析version such as 'v4.2.0' or `>=4.0.0'
 * @param version
 * @returns {Number}
 */
const parseVersion = (version) => {
	return parseFloat(version.replace(/[^\d\.]/g, ''))
}

/**
 * 检查本地node版本是否过低，低于要求的版本
 * @param minNodeVersion
 * @returns {boolean}
 */
exports.checkNodeVersion = (minNodeVersion) => {

	const minVersion = parseVersion(minNodeVersion)
	const nowVersion = parseVersion(process.version)
	return !(minVersion > nowVersion)

}

/**
 * 检测脚手架版本
 * @param nowVersion
 */
exports.checkFrogCliVersion = (nowVersion) => {

	const opts = {
		uri: 'https://registry.npmjs.org/frog-cli',
		timeout: 1000,
		json: true
	}

	const promise = new Promise((resolve) => {
		request(opts)
			.then(res => {
				const latestVersion = res['dist-tags'].latest
				if(parseVersion(latestVersion) > parseVersion(nowVersion)) {
					resolve(latestVersion)
				}else{
					resolve(null)
				}
			})
			.catch(err => {
				resolve(null)
			})
	})

	return promise

}

/**
 * 从git配置文件中获取用户名与邮箱
 * @returns {string}
 */
exports.gitUser = () => {

	let name = ''
	let email = ''

	try {
		name = exec('git config --get user.name')
		email = exec('git config --get user.email')
	} catch (e) {}

	name = name && name.toString().trim()
	email = email && (' <' + email.toString().trim() + '>')
	return (name || '') + (email || '')

}
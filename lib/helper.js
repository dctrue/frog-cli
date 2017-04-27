
"use strict"

const Promise = require('bluebird')
const request = require('request-promise')
const semver = require('semver')
const exec = require('child_process').execSync

/**
 * version格式清理
 * @param versionString
 * @returns {*}
 */
const cleanVersion = (versionString) => {
	const version = versionString.replace(/[^\d\.]/g, '')
	return semver.clean(version)
}

/**
 * 检查本地node版本是否过低，低于要求的版本
 * @param minNodeVersion
 * @returns {boolean}
 */
exports.checkNodeVersion = (minNodeVersion) => {

	const minVersion = cleanVersion(minNodeVersion)
	const nowVersion = cleanVersion(process.version)
	return semver.gt(nowVersion, minVersion)

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

	return new Promise((resolve, reject) => {
		request(opts)
			.then(res => {
				const latestVersion = res['dist-tags'].latest
				if(semver.gt(cleanVersion(latestVersion), cleanVersion(nowVersion))) {
					resolve(latestVersion)
				}else{
					resolve('')
				}
			})
			.catch(err => {
				reject(err)
			})
	})

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
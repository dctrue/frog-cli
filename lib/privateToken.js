
"use strict"

const nodeLocalStorage = require('node-localstorage')

const config = require('../config')

const localStorage = new nodeLocalStorage.LocalStorage(config.tokenDB)

/**
 * gitlab private token
 */
class PrivateToken {

	constructor(){
	}

	/**
	 * 设置token
	 * todo: 判断是否已存在token
	 * @param token
	 * @returns {*}
	 */
	setToken(token) {
		localStorage.setItem(config.tokenDBKey, token)
		return token
	}

	/**
	 * 获取token
	 * @returns {string}
	 */
	getToken() {
		try {
			return localStorage.getItem(config.tokenDBKey) || ''
		} catch(e) {
			return ''
		}

	}

	/**
	 * 删除token
	 */
	remove() {
		return localStorage.removeItem(config.tokenDBKey)
	}

	/**
	 * 检测是否存在token
	 * @returns {boolean}
	 */
	isEmpty() {
		return !this.getToken()
	}

}

module.exports = new PrivateToken()

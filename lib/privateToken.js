/**
 * Created by Administrator on 2017/4/24.
 */

"use strict"

// const path = require('path')
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
	 * @param token
	 * @returns {*}
	 */
	set(token) {
		localStorage.setItem(config.tokenDBKey, token)
		return token
	}

	/**
	 * 获取token
	 * @returns {string}
	 */
	get() {
		return localStorage.getItem(config.tokenDBKey) || ''
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
		return !localStorage.getItem(config.tokenDBKey)
	}

}

module.exports = new PrivateToken()

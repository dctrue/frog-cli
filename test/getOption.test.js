/**
 * Created by jlw on 2016/10/18.
 */

require('should')

const getOptions = require('../lib/getOptions')

const MOCK_META_JSON_PATH = './test/mock-data/mock-meta-json'
const MOCK_META_JS_PATH = './test/mock-data/mock-meta-js'

describe('get meta data', () => {
    it('get meta from json file', () => {
        const opts = getOptions('test', MOCK_META_JSON_PATH)
        opts.should.be.type('object')
        opts.should.have.property('successMessage')
    })
    it('get meta from js file', () => {
        const opts = getOptions('test', MOCK_META_JS_PATH)
        opts.should.be.type('object')
        opts.should.have.property('successMessage')
    })
})

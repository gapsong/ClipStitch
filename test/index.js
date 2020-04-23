import { convertDurationtoSeconds } from '../lib/commentFetch'
var expect = require('expect.js')

describe('Example Node Server', () => {
    it('should return 200', (done) => {
        done()
    })
})

describe('converts Time correctly', () => {
    it('should return correct seconds', () => {
        expect(convertDurationtoSeconds('2h44m2s')).to.equal(9842)
    })
    it('should test without seconds', () => {
        expect(convertDurationtoSeconds('2h44m')).to.equal(9840)
    })    
    it('should test without hours and without seconds', () => {
        expect(convertDurationtoSeconds('44m')).to.equal(2640)
    })
})

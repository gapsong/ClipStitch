import expect from 'expect.js'
import { getAverageNumberComments } from '../lib/statsEngine'

describe('get Average Value', () => {
    it('should return the average value of the comment times', () => {
        expect(getAverageNumberComments()).to.equal(10.22)
    })
})

describe('get Average Value in interval around pivot', () => {
    it('should return the average value of the comment times', () => {
        expect(getAverageNumberComments()).to.equal(10.22)
    })
})

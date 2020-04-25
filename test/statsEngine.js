import expect from 'expect.js'
import {
    getAverageNumberComments,
    getAverageNumberAroundIndex,
    getEntriesPerSeconds,
} from '../lib/statsEngine'

describe('get Average Value', () => {
    it('should return the average value of the comment times', () => {
        expect(getAverageNumberComments()).to.equal(10.22)
    })
})

describe('getEntriesPerSeconds()', () => {
    it('should return an array with comments per second', () => {
        const mockData = [
            {
                content_offset_seconds: 0.5,
            },
            {
                content_offset_seconds: 0.5,
            },
            {
                content_offset_seconds: 2,
            },
            {
                content_offset_seconds: 2.5,
            },
            {
                content_offset_seconds: 4,
            },
        ]
        expect(getEntriesPerSeconds(mockData)).to.eql([2, 0, 2, 0, 1])
    })

    it('tests special cases', () => {
        const mockData = []
        expect(getEntriesPerSeconds(mockData)).to.eql([])
    })

    it('tests special cases', () => {
        const mockData = [
            {
                content_offset_seconds: 1,
            },
            {
                content_offset_seconds: 1,
            },
            {
                content_offset_seconds: 1,
            },
            {
                content_offset_seconds: 1,
            },
        ]
        expect(getEntriesPerSeconds(mockData)).to.eql([0, 4])
    })
})

describe.skip('get Average Value in interval around pivot', () => {
    it('should return the average value of the comment times', () => {
        expect(getAverageNumberAroundIndex(5, 3)).to.equal(10.22)
    })
})

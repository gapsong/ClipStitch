import expect from 'expect.js'
import {
    getAverageNumberComments,
    getAverageCountFromTo,
    getEntriesPerSeconds,
} from '../lib/statsEngine'

describe.skip('get Average Value', () => {
    it('should return the average value of the comment times', () => {
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
        expect(getAverageNumberComments(mockData)).to.equal(10.22)
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

describe('getAverageCountFromTo()', () => {
    it('tests 1', () => {
        const mockData = [1, 3, 5, 3, 2, 8, 6, 5, 3, 2]
        expect(getAverageCountFromTo(mockData, 0, 5)).to.equal(2.8)
    })
    it('test 2', () => {
        const mockData = [1, 3, 5, 3, 2, 8, 6, 5, 3, 2]
        expect(getAverageCountFromTo(mockData, 0, 6)).to.equal(3.66)
    })
})

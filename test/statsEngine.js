import expect from 'expect.js'
import {
    getSlidingAverage,
    getAverageCountFromTo,
    getEntriesPerSeconds,
} from '../lib/statsEngine'

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
    it('test 1', () => {
        const mockData = [1, 3, 5, 3, 2, 8, 6, 5, 3, 2]
        expect(getAverageCountFromTo(mockData, 0, 5)).to.equal(2.8)
    })
    it('test 2', () => {
        const mockData = [1, 3, 5, 3, 2, 8, 6, 5, 3, 2]
        expect(getAverageCountFromTo(mockData, 0, 6)).to.equal(3.66)
    })
})

describe('getSlidingAverage()', () => {
    //moving average. sliding window

    it('test 0', () => {
        const mockData = [1]
        const windowSize = 4
        expect(getSlidingAverage(mockData, windowSize)).to.eql([])
    })

    it('test 1', () => {
        const mockData = [1, 3, 5, 3, 2, 8, 6, 5, 3, 2]
        const windowSize = 4
        expect(getSlidingAverage(mockData, windowSize)).to.eql([
            3,
            3.25,
            4.5,
            4.75,
            5.25,
            5.5,
            4,
        ])
    })

    it('test 2', () => {
        const mockData = [1, 3, 0, 3, 0, 8, 6, 5, 3, 12]
        const windowSize = 2
        expect(getSlidingAverage(mockData, windowSize)).to.eql([
            2,
            1.5,
            1.5,
            1.5,
            4,
            7,
            5.5,
            4,
            7.5,
        ])
    })
})

describe('getActivityPeaks()', () => {
    it('test 1', () => {
        const multiplier = 4
        const mockData = []

        expect(getActivityPeaks(mockData)).to.eql([])
    })
})

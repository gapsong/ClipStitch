import get from 'lodash/get'
import comments from '../../mocks/comments.json'

export const getAverageNumberComments = () => {
    const totalTime = comments.reduce((acc, item) => {
        return acc + item.content_offset_seconds
    }, 0)
    const avgTimeRounded =
        Math.round(((totalTime + Number.EPSILON) * 100) / comments.length) / 100
    return avgTimeRounded
}

export const getAverageNumberAroundIndex = (index, interval) => {
    var test = 0
    for (var i = index - 5; i < index + interval; i++) {
        test = test + comments[i].content_offset_seconds
    }
    return test
}

export const getEntriesPerSeconds = (array) => {
    if (!Array.isArray(array) || !array.length) {
        return []
    }
    const temp = new Array(
        array[array.length - 1].content_offset_seconds + 1
    ).fill(0)

    return array.reduce((acc, item) => {
        const second = Math.floor(item.content_offset_seconds)
        acc[second]++
        return acc
    }, temp)
}

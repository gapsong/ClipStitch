export const getAverageCountFromTo = (array, start, end) => {
    var test = 0
    for (var i = start; i < end; i++) {
        test += array[i]
    }
    const number = test / (end - start)
    const avgRounded = Math.floor(number * 100) / 100
    return avgRounded
}

export const getEntriesPerSeconds = (array) => {
    if (!Array.isArray(array) || !array.length) {
        return []
    }
    const temp = new Array(Math.floor(array[array.length - 1].content_offset_seconds) + 1).fill(0)

    return array.reduce((acc, item) => {
        const second = Math.floor(item.content_offset_seconds)
        acc[second]++
        return acc
    }, temp)
}

export const sumArray = (array, windowSize) => {
    const response = new Array(Math.floor(array.length / windowSize) + 1).fill(0)

    return array.reduce((acc, item, index) => {
        const temp = Math.floor(index / windowSize)
        acc[temp] += item
        return acc
    }, response)
}

export const getSlidingAverage = (values = [], windowSize = 0) => {
    if (values.length < windowSize) {
        return []
    }

    let lastAvgValue = getAverageCountFromTo(values, 0, windowSize)

    const temp = [lastAvgValue]

    for (var i = 0; i < values.length - windowSize; i++) {
        lastAvgValue += (1 / windowSize) * (values[i + windowSize] - values[i])
        temp.push(lastAvgValue)
    }

    return temp
}

export const sumArray10 = (array) => sumArray(getEntriesPerSeconds(array), 10)

export const getActivityPeaks = (mockData = [], sldingAverage = [], threshold = 0) => {}

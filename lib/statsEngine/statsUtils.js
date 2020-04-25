export const getAverageNumberComments = (array) => {
    const totalTime = array.reduce((acc, item) => {
        return acc + item.content_offset_seconds
    }, 0)
    const avgTimeRounded =
        Math.round(((totalTime + Number.EPSILON) * 100) / array.length) / 100
    return avgTimeRounded
}

export const getAverageCountFromTo = (array, start, end) => {
    var test = 0
    for (var i = start; i < end; i++) {
        test = test + array[i]
    }
    const number = test / (end - start)
    const avgRounded = Math.floor(number * 100) / 100
    return avgRounded
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

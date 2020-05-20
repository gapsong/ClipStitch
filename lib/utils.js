export const filterCommentsByWords = (array, substrings) => {
    return array.filter((item) => {
        const str = item.comment
        if (str.length > 15) {
            return false
        }

        return substrings.some((v) => {
            return str.includes(v)
        })
    })
}

export const timestampCleanup = (cleanComments) => {
    const temp = cleanComments.map((item) => {
        return [Math.floor(item.time / 10) - 1, Math.floor(item.time / 10)]
    })
    return [...new Set(temp.flat())]
}

export const ultimateTimestampAlgorithm = (cleanComments, tags) => {
    cleanComments = cleanComments.filter((item) => {
        const str = item.comment
        return tags.some((v) => {
            return str.includes(v)
        })
    })
    const nachher = delete10Schritt(cleanComments, 1000)
    return nachher
}

// get returns first finding in speficied time
// delta in ms
const delete10Schritt = (cleanComments = [], delta) => {
    let timestamps = [cleanComments[0]]
    cleanComments.forEach((item, index) => {
        if (
            0 < index &&
            timestamps[timestamps.length - 1].time + delta < item.time
        ) {
            timestamps.push(item)
        }
    })
    return timestamps
}

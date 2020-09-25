export const filterCommentsByWords = (array, substrings) => {
    return array.filter((item) => {
        const str = item.message.toLowerCase()
        if (str.length > 15) {
            return false
        }

        return substrings.some((v) => {
            return str.includes(v)
        })
    })
}

// _____| __________ | | | ____________ input
//      ^            ^                  output
export const ultimateTimestampAlgorithm = (array, tags) => {
    array = array.filter((item) => {
        const str = item.message
        return tags.some((v) => {
            return str.includes(v)
        })
    })

    return getFirstFindings(array, 10)
}

// get returns first finding in specified time
const getFirstFindings = (array = [], delta) => {
    let timestamps = [array[0]]
    array.forEach((item, index) => {
        if (0 < index && timestamps[timestamps.length - 1].time + delta < item.time) {
            timestamps.push(item)
        }
    })
    return timestamps
}

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

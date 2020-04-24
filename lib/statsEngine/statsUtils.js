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
    
}
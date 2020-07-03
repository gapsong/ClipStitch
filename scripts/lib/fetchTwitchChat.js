import axios from 'axios'
import get from 'lodash.get'
import fs from 'fs'

const getVideoDuration = async (videoId) => {
    return await axios
        .get(`https://id.twitch.tv/videos/${videoId}`, {
            headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
        })
        .then((response) => {
            return response.data.length
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
}

const fetchRawCommentsById = async (videoId, callback) => {
    const videoDuration = await getVideoDuration(videoId)
    var stream
    stream = fs.createWriteStream(`./src/chatCollection/rawData/${videoId}.json`)
    stream.write(`{"videoId": ${videoId}, 
    "comments": [`)

    streamCommentsIntoFile(stream, videoId, videoDuration, false, callback)
}

const streamCommentsIntoFile = async (stream, videoId, videoDuration, nextPage, callback) => {
    let params
    if (nextPage) {
        params = {
            cursor: nextPage,
        }
    } else {
        params = {
            content_offset_seconds: 0,
        }
    }

    return await axios
        .get(`https://api.twitch.tv/v5/videos/${videoId}/comments`, {
            headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
            params,
        })
        .then((response) => {
            // handle success
            const nextPage = get(response, 'data._next', false)
            const results = get(response, 'data.comments', []).reduce((acc, item) => {
                const message = item.message.body
                if (!message.startsWith('@')) {
                    return acc.concat([
                        {
                            content_offset_seconds: item.content_offset_seconds,
                            message: message,
                        },
                    ])
                } else return acc
            }, [])

            console.log(
                'You are at: ' + (Math.round(results[results.length - 1].content_offset_seconds) / videoDuration).toFixed(2) * 100 + '%'
            )
            if (nextPage) {
                results.forEach((item) => {
                    stream.write(JSON.stringify(item, null, 4) + ',')
                })
                streamCommentsIntoFile(stream, videoId, videoDuration, nextPage, callback)
            } else {
                const lastElement = results.pop()
                results.forEach((item) => {
                    stream.write(JSON.stringify(item, null, 4) + ',')
                })
                stream.end(JSON.stringify(lastElement, null, 4) + ']}', callback)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
}

export const fetchTwitchChatById = (videoId, callback) => {
    fetchRawCommentsById(videoId, callback)
}

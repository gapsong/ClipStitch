import axios from 'axios'
import get from 'lodash.get'
import fs from 'fs'
import { PATH, CLIENT_ID } from '../config'

const getVideoDuration = async (videoId) => {
    return await axios
        .get(`https://api.twitch.tv/kraken/videos/${videoId}`, {
            headers: {
                'Client-Id': CLIENT_ID,
                Accept: 'application/vnd.twitchtv.v5+json',
            },
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
    stream = fs.createWriteStream(`${PATH}/rawData/${videoId}.json`)
    stream.on('finish', () => {
        callback(videoId)
    })

    stream.write(`{"videoId": ${videoId}, 
    "comments": [`)

    streamCommentsIntoFile(stream, videoId, videoDuration, false)
}

const streamCommentsIntoFile = async (stream, videoId, videoDuration, nextPage) => {
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
            headers: { 'Client-Id': CLIENT_ID },
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

            if (nextPage) {
                results.forEach((item) => {
                    stream.write(JSON.stringify(item, null, 4) + ',')
                })
                streamCommentsIntoFile(stream, videoId, videoDuration, nextPage)
            } else {
                const lastElement = results.pop()
                results.forEach((item) => {
                    stream.write(JSON.stringify(item, null, 4) + ',')
                })
                stream.end(JSON.stringify(lastElement, null, 4) + ']}')
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

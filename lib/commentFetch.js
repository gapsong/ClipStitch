import axios from 'axios'
import get from 'lodash.get'
import fs from 'fs'

const streamCommentsIntoFile = async (stream, videoId, nextPage = false) => {
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
            const results = get(response, 'data.comments', []).reduce(
                (acc, item) => {
                    const message = item.message.body
                    if (!message.startsWith('@')) {
                        return acc.concat([
                            {
                                content_offset_seconds:
                                    item.content_offset_seconds,
                                message: message,
                            },
                        ])
                    } else return acc
                },
                []
            )
            if (nextPage) {
                results.forEach((item) => {
                    stream.write(JSON.stringify(item, null, 4) + ',')
                })
                streamCommentsIntoFile(stream, videoId, nextPage)
            } else {
                stream.write(`{
                    "content_offset_seconds": "-1",
                    "message": "noText",
                }]`)
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
}

const fetchRawCommentsById = (videoId) => {
    var stream
    stream = fs.createWriteStream('data.json')
    stream.write('[')
    streamCommentsIntoFile(stream, videoId)
}

const readStream = () => {
    var stream
    stream = fs.createReadStream('data.json')

    stream
        .on('data', function (data) {
            var chunk = data.toString()
            console.log(chunk)
        })
        .on('end', (params) => {
            console.log('params', params)
        })
}

// returns or Fetch if data not there
const getRawComments = async (videoId) => {
    return await fetchRawCommentsById(videoId).then((rawComments) => {
        fs.writeFileSync(
            'rawComments.json',
            JSON.stringify(rawComments, null, 4)
        )
        return rawComments
    })
    // return require('../rawComments.json')
}

const getVideoCreationDateById = async (id) => {
    return await axios
        .get(`https://api.twitch.tv/kraken/videos/${id}`, {
            headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
        })
        .then((response) => {
            return new Date(response.data.created_at)
        })
}

// time in seconds
const clearComments = (rawComments, videoStart) => {
    const cleanComments = rawComments.map((item) => {
        const commentTime = new Date(item.created_at)
        const diffTime = Math.round(Math.abs(commentTime - videoStart) / 1000)

        return { time: diffTime, comment: item.message.body }
    })

    return cleanComments
}

export const getCommentsById = async (videoId) => {
    // readStream()
    fetchRawCommentsById(videoId)
    // const rawComments = await getRawComments(videoId)
    // const videoStart = await getVideoCreationDateById(videoId)

    // const cleanComments = clearComments(rawComments, videoStart)
    // fs.writeFileSync(
    //     'cleanComments.json',
    //     JSON.stringify(cleanComments, null, 4)
    // )

    // return cleanComments
}

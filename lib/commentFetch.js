import axios from 'axios'
import get from 'lodash.get'
import fs from 'fs'
import events from 'events'

const eventEmitter = new events.EventEmitter()

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
                    "message": "noText"
                }]`)
                //Fire the 'scream' event:
                eventEmitter.emit('finishedDownload')
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })
}

const fetchRawCommentsById = (videoId) => {
    var stream
    stream = fs.createWriteStream(`${videoId}.json`)
    stream.write('[')
    streamCommentsIntoFile(stream, videoId)
}

//Assign the event handler to an event:
eventEmitter.on('finishedDownload', () => {
    readStream()
})

const readStream = () => {
    var stream
    stream = fs.createReadStream('data.json')
    console.log('start to read stream')
    stream
        .on('data', function (data) {
            var chunk = data.toString()
            // console.log(chunk)
        })
        .on('end', (params) => {
            // console.log('params', params)
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

export const convertDurationtoSeconds = (time) => {
    time = time.split(new RegExp('s|m|h'))
    time = time.map((item) => {
        return parseInt(item)
    })
    if (time.length == 4) {
        return (time[0] * 60 + time[1]) * 60 + time[2]
    }
    if (time.length == 3) {
        return time[0] * 60 + time[1]
    }
    if (time.length == 2) {
        return time[0]
    }
}

const getVideoTime = (videoId) =>
    axios
        .get(`https://api.twitch.tv/helix/videos?id=${videoId}`, {
            headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
        })
        .then((response) => {
            console.log(response.data.data[0].duration)
            convertTime('2h48m5s')
        })
        .catch(function (error) {
            // handle error
            console.log(error)
        })

export const getCommentsById = (videoId) => {
    getVideoTime(videoId)
    fetchRawCommentsById(videoId)
}

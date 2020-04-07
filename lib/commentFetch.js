import axios from 'axios'
import get from 'lodash.get'
import fs from 'fs'

const fetchRawCommentsById = async (videoId, nextPage = false) => {
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
        .then(async (response) => {
            // handle success
            const nextPage = get(response, 'data._next', false)
            const results = get(response, 'data.comments', [])
            if (nextPage) {
                return results.concat(
                    await fetchRawCommentsById(videoId, nextPage)
                )
            } else {
                return results
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error)
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
    const rawComments = await getRawComments(videoId)
    const videoStart = await getVideoCreationDateById(videoId)

    const cleanComments = clearComments(rawComments, videoStart)
    fs.writeFileSync(
        'cleanComments.json',
        JSON.stringify(cleanComments, null, 4)
    )

    return cleanComments
}

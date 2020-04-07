import axios from 'axios'
import fs from 'fs'

import {
    filterCommentsByWords,
    timestampCleanup,
    ultimateTimestampAlgorithm,
} from './utils'
import { getCommentsById } from './commentFetch'

const getCloudFrontDomainById = async (videoId) => {
    // https://gql.twitch.tv/gql#origin=twilight
    return await axios({
        method: 'POST',
        url: 'https://gql.twitch.tv/gql#origin=twilight',
        headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
        data: [
            {
                operationName: 'VideoPlayer_VODSeekbarPreviewVideo',
                variables: {
                    videoID: `${videoId}`,
                },
                extensions: {
                    persistedQuery: {
                        version: 1,
                        sha256Hash:
                            '988844d55fb7369e30832ec236b7a7c96bb0d53617e2f55ebb1030008336120f',
                    },
                },
            },
        ],
    })
        .then(function (response) {
            return response.data[0].data.video.seekPreviewsURL.split(
                '/story'
            )[0]
        })
        .catch(function (error) {
            console.log(error)
        })
}

const downloadVideoChunk = async (cloudfront, chunkNumber) => {
    return await axios({
        method: 'get',
        url: `${cloudfront}/chunked/${chunkNumber}.ts`,
        responseType: 'stream',
        headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`${chunkNumber}.mp4`))
    })
}

const main = async (VIDEO_ID) => {
    const cloudFrontUrl = await getCloudFrontDomainById(VIDEO_ID)

    const comments = await getCommentsById(VIDEO_ID)
    console.log('comments', comments)
    const filteredArray = ultimateTimestampAlgorithm(comments, [
        'cannon',
        'CANNON',
        'Cannon',
    ])
    console.log('filteredArray', filteredArray)
    fs.writeFileSync(
        'filtedComments.json',
        JSON.stringify(filteredArray, null, 4)
    )
    const timeStampsArray = timestampCleanup(filteredArray)
    console.log(timeStampsArray)
    Promise.all(
        timeStampsArray.map(async (timestamp) => {
            console.log(timestamp)
            await downloadVideoChunk(cloudFrontUrl, timestamp)
        })
    )
}
main(585562495)
// ultimateTimestampAlgorithm(data, ['cannon', 'CANNON', 'Cannon', 'LuL'])

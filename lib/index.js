import axios from 'axios'
import fs from 'fs'

import { getCommentsById } from './commentFetch'
import comments from '../625659892.json'
import { getEntriesPerSeconds, sumArray } from './statsEngine'

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
    // const cloudFrontUrl = await getCloudFrontDomainById(VIDEO_ID)
    // downloadVideoChunk(cloudFrontUrl, 2)
    // const comments = await getCommentsById(VIDEO_ID)
    // const filteredArray = ultimateTimestampAlgorithm(comments, [
    //     'cannon',
    //     'CANNON',
    //     'Cannon',
    // ])
    // Promise.all(
    //     timeStampsArray.map((timestamp) => {
    //         console.log(timestamp)
    //         downloadVideoChunk(cloudFrontUrl, timestamp)
    //     })
    // )
}

// main(625659892)

// printAnalysis()

// json data

// parse json
// stringify JSON Object
var jsonContent = JSON.stringify(sumArray(getEntriesPerSeconds(comments), 10))
console.log(jsonContent)

fs.writeFile('output.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File.')
        return console.log(err)
    }

    console.log('JSON file has been saved.')
})

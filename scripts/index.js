import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import data from '../twitchNames.json'
import { getVideoIdsByTwitchName } from './lib/fetchVideoId'
import { PATH } from './config'
import { sumArray10, getSlidingAverage } from './lib/statsUtils'
import { filterCommentsByWords } from './lib/utils'

const modifyRawComments = (videoId) => {
    try {
        const rawData = fs.readFileSync(`${PATH}/rawData/${videoId}.json`, 'utf-8')
        let rawComments = JSON.parse(rawData)
        const filteredTags = ['LOL', 'LULW', 'KEKW', 'WTF', 'LMAO', 'lol', 'clip', 'OMEGALUL', 'POG', 'pog', 'POGGERS', 'PogU', 'pogu']
        const level0 = filterCommentsByWords(rawComments.comments, filteredTags)
        const level1 = sumArray10(level0)
        const level2 = sumArray10(rawComments.comments)
        const level3 = getSlidingAverage(level2, 100)
        var mergedArray = []
        for (var i = 0; i < Math.min(level1.length, level2.length, level3.length); i++) {
            mergedArray.push({
                raw: level2[i],
                filtered: level1[i],
                average: level3[i],
                timestamp: i * 10
            })
        }
        const jsonContent = JSON.stringify(
            {
                videoId: videoId,
                filteredTags: filteredTags,
                comments: mergedArray
            },
            null,
            4
        )
        fs.writeFile(`${PATH}/modified/${videoId}.json`, jsonContent, 'utf8', function (err) {
            if (err) {
                console.log('An error occured while writing JSON Object to File.')
                return console.log(err)
            }
            console.log('Alle Filter wurden eingebaut')
            getFinalTimestamps(videoId)
        })
    } catch (error) {
        console.log(error)
        console.log('Aber hier werden nun die Arrays runtergeladen')
        fetchTwitchChatById(videoId, modifyRawComments)
    }
}

const getFinalTimestamps = (videoId) => {
    const modifiedData = fs.readFileSync(`${PATH}/modified/${videoId}.json`, 'utf-8')
    let modifiedComments = JSON.parse(modifiedData)
    const finalTimestamps = []

    modifiedComments.comments.map((item, index) => {
        if (item.filtered > item.average / 2 && modifiedComments.comments[index ? index - 1 : 0].raw * 10 < item.raw) {
            finalTimestamps.push(Object.assign({}, item, { timestamp: index * 10 }))
        }
    })

    fs.writeFile(
        `${PATH}/final/${videoId}.json`,
        JSON.stringify(Object.assign({}, modifiedComments, { comments: finalTimestamps }), null, 4),
        'utf8',
        function (err) {
            if (err) {
                console.log('An error occured while writing JSON Object to File.')
                return console.log(err)
            }
            console.log('Final Timestamps')
        }
    )
}

const test = Promise.all(
    data.twitchUser.map((user) => {
        return getVideoIdsByTwitchName(user)
    })
).then((data) => {
    fs.writeFile(`./videoIds.json`, JSON.stringify(data, null, 4), 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.')
            return console.log(err)
        }
    })
    data.map((item) => {
        return item.videoIds.map((videoId) => {
            return modifyRawComments(videoId)
        })
    })
})

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
            mergedArray.push({ raw: level2[i], filtered: level1[i], average: level3[i] })
        }
        const jsonContent = JSON.stringify(
            {
                videoId: videoId,
                filteredTags: filteredTags,
                comments: mergedArray,
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
        })
    } catch (error) {
        fetchTwitchChatById(videoId, modifyRawComments)
    }
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

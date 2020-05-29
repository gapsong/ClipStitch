import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import { sumArray10, getSlidingAverage } from './lib/statsUtils'
import { filterCommentsByWords } from './lib/utils'

const VIDEO_ID = 621148192

const callback = () => {
    const rawComments = require(`./../src/chatCollection/rawData/${VIDEO_ID}.json`)
    const filteredTags = ['LOL', 'LULW', 'KEKW', 'WTF', 'LMAO', 'lol', 'clip', 'OMEGALUL', 'POG', 'pog', 'POGGERS', 'PogU', 'pogu']
    const level0 = filterCommentsByWords(rawComments.comments, filteredTags)
    const level1 = sumArray10(level0)
    const level2 = sumArray10(rawComments.comments)
    const level3 = getSlidingAverage(level2, 100)

    console.log(level1.length)
    console.log(level2.length)

    var mergedArray = []
    for (var i = 0; i < Math.min(level1.length, level2.length, level3.length); i++) {
        mergedArray.push({ raw: level2[i], filtered: level1[i], average: level3[i] })
    }

    const jsonContent = JSON.stringify(
        {
            videoId: VIDEO_ID,
            filteredTags: filteredTags,
            comments: mergedArray,
        },
        null,
        4
    )

    fs.writeFile(`./src/chatCollection/modified/${VIDEO_ID}.json`, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.')
            return console.log(err)
        }

        console.log('Alle Filter wurden eingebaut')
    })
}

// fetchTwitchChatById(VIDEO_ID, callback)

callback()

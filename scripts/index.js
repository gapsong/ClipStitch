import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import { sumArray, getEntriesPerSeconds } from './lib/statsUtils'
import { filterCommentsByWords } from './lib/utils'

const VIDEO_ID = 621148192

const callback = () => {
    const rawComments = require(`./../src/chatCollection/rawData/${VIDEO_ID}.json`)
    const filteredTags = ['LOL', 'LULW', 'KEKW', 'WTF', 'LMAO', 'lol', 'clip', 'OMEGALUL']
    const level0 = filterCommentsByWords(rawComments.comments, filteredTags)
    const level1 = sumArray(getEntriesPerSeconds(level0), 10)
    const level2 = sumArray(getEntriesPerSeconds(rawComments.comments), 10)

    const jsonContent = JSON.stringify(
        {
            videoId: VIDEO_ID,
            filteredTags: filteredTags,
            rawComments: rawComments.comments,
            entriesPerSeconds: level2,
            filteredComments: level1,
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

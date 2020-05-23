import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import { sumArray, getEntriesPerSeconds } from './lib/statsUtils'
import { filterCommentsByWords } from './lib/utils'

const VIDEO_ID = 621148192

const callback = () => {
    const PATH = `../${VIDEO_ID}.json`
    const chatHistory = require(PATH)
    const filteredTags = ['LOL', 'LULW', 'KEKW', 'WTF', 'LMAO', 'lol', 'clip', 'OMEGALUL']
    const level0 = filterCommentsByWords(chatHistory.comments, filteredTags)
    const level1 = getEntriesPerSeconds(level0)
    const level2 = sumArray(level1, 10)
    const jsonContent = JSON.stringify({
        videoId: VIDEO_ID,
        rawComments: chatHistory.comments,
        entriesPerSeconds: level1,
        filteredComments: level2,
        filteredTags: filteredTags,
    })

    fs.writeFile(`./ClipStitchVisualizer/src/chatcollection/${VIDEO_ID}.json`, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.')
            return console.log(err)
        }

        console.log('JSON file has been saved.')
    })
}

fetchTwitchChatById(VIDEO_ID, callback)


import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import { sumArray, getEntriesPerSeconds } from './lib/statsUtils'
import { filterCommentsByWords } from './lib/utils'

const VIDEO_ID = 626592543

// fetchTwitchChatById(VIDEO_ID)
const PATH = `../ClipStitchVisualizer/src/chatcollection/rawData/${VIDEO_ID}.json`
const chatHistory = require(PATH)
const level0 = filterCommentsByWords(chatHistory.comments, [
    'LOL',
    'LULW',
    'KEKW',
    'WTF',
    'LMAO',
    'lol',
    'clip',
    'OMEGALUL'
])
const level1 = getEntriesPerSeconds(level0)
const level2 = sumArray(level1, 10)
const jsonContent = JSON.stringify({ videoId: VIDEO_ID, comments: level2 })

fs.writeFile('outputFilterWords.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File.')
        return console.log(err)
    }

    console.log('JSON file has been saved.')
})

import fs from 'fs'

import { fetchTwitchChatById } from './lib/fetchTwitchChat'
import { sumArray, getEntriesPerSeconds } from './lib/statsUtils'

const VIDEO_ID = 627447662

// fetchTwitchChatById(VIDEO_ID)

const chatHistory = require(`../${VIDEO_ID}.json`)
const level1 = getEntriesPerSeconds(chatHistory.comments)
const level2 = sumArray(level1, 10)
const jsonContent = JSON.stringify({ videoId: VIDEO_ID, comments: level2 })

fs.writeFile('output.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log('An error occured while writing JSON Object to File.')
        return console.log(err)
    }

    console.log('JSON file has been saved.')
})

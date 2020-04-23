import fs from 'fs'
// import comments from '../data.json'

export const printAnalysis = () => {
    const arrayLength = Math.floor(
        comments[comments.length - 1].content_offset_seconds / 10 + 1
    )

    var temp = new Array(arrayLength).fill(0)
    comments.forEach((item) => {
        const time = item.content_offset_seconds
        temp[Math.floor(time / 10)]++
    })

    console.log(temp)
    console.log(temp[temp.length - 1])

    fs.writeFileSync('analysis.json', JSON.stringify(temp, null, 4))
}

// TODO: ich will mir die Verteilung von den Kommentaren angucken.
// Schritt 1: Erstmal sollen alle 10 Sekunden intervalle aufaddiert werden

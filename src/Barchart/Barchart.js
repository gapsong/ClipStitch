import React from 'react'
import * as ui from './ui'

const SCALE = 500

const Barchart = ({ data }) => {
    const max = data.comments.reduce((acc, item) => {
        if (item.raw > acc) {
            return item.raw
        }
        return acc
    }, 0)

    const scaler = (value) => (value / max) * SCALE

    return (
        <ui.Wrapper>
            Twitch chat
            <br />
            Activity Tags:{' '}
            {data.filteredTags.map((item) => {
                return item + ', '
            })}
            <ui.Scrollview>
                {data.comments.map((item, index) => {
                    const rawHeight = scaler(item.raw)
                    const filteredHeight = rawHeight - scaler(item.filtered)
                    const averageHeight = rawHeight - scaler(item.average)
                    return (
                        <ui.Col
                            key={index}
                            onClick={() => {
                                // window.open(`https://www.twitch.tv/videos/${data.videoId}?t=${(index - 1) * 10}s`, '_blank')
                                window.open(`https://www.twitch.tv/videos/${data.videoId}?t=${item.timestamp}s`, '_blank') //final cut version
                            }}
                        >
                            <ui.Bar height={rawHeight}>
                                <ui.Line top={filteredHeight} color='green' />
                                <ui.Line top={averageHeight} color='red' />
                            </ui.Bar>
                            <br />
                            {item.raw}
                            <br />
                            {item.filtered}
                            <br />
                            {item.average}
                        </ui.Col>
                    )
                })}
                <br />
            </ui.Scrollview>
        </ui.Wrapper>
    )
}

export default Barchart

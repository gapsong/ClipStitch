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
                    // const

                    return (
                        <ui.Col
                            onClick={() => {
                                window.open(`https://www.twitch.tv/videos/${data.videoId}?t=${(index - 1) * 10}s`, '_blank')
                            }}
                        >
                            <ui.Bar height={item.raw / max} scale={SCALE}>
                                <ui.Line height={item} scale={SCALE} />
                                <ui.Line height={item} scale={SCALE} />
                            </ui.Bar>
                            <br />
                            {item.raw}
                        </ui.Col>
                    )
                })}
                <br />
            </ui.Scrollview>
        </ui.Wrapper>
    )
}

export default Barchart

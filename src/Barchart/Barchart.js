import React from 'react'
import * as ui from './ui'

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
                    return (
                        <ui.Col
                            onClick={() => {
                                window.open(`https://www.twitch.tv/videos/${data.videoId}?t=${(index - 1) * 10}s`, '_blank')
                            }}
                        >
                            <ui.Bar height={item.raw / max}>
                                <ui.Line height={item} />
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

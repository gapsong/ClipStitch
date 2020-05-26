import React from 'react'
import * as ui from './ui'

const Barchart = ({ data }) => {
    const max = Math.max(...data.entriesPerSeconds)

    return (
        <ui.Wrapper>
            Twitch chat
            <br />
            Activity Tags:{' '}
            {data.filteredTags.map((item) => {
                return item + ', '
            })}
            <ui.Scrollview>
                {data.entriesPerSeconds.map((item, index) => {
                    return (
                        <ui.Col
                            onClick={() => {
                                window.open(`https://www.twitch.tv/videos/${data.videoId}?t=${(index - 1) * 10}s`, '_blank')
                            }}
                        >
                            <ui.Bar height={(item - data.filteredComments[index]) / max} />
                            <ui.Bar height={data.filteredComments[index] / max} /> {item}
                            <br />
                            {data.filteredComments[index]}
                        </ui.Col>
                    )
                })}
                <br />
            </ui.Scrollview>
        </ui.Wrapper>
    )
}

export default Barchart

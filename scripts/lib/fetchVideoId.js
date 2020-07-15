import axios from 'axios'

export const getVideoIdsByTwitchName = async (username) => {
    return await axios({
        method: 'POST',
        url: 'https://gql.twitch.tv/gql#origin=twilight',
        headers: { 'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko' },
        data: [
            {
                operationName: 'FilterableVideoTower_Videos',
                variables: { limit: 90, channelOwnerLogin: username, broadcastType: null, videoSort: 'TIME' },
                extensions: {
                    persistedQuery: { version: 1, sha256Hash: 'a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb' },
                },
            },
        ],
    })
        .then(function (response) {
            const temp = response.data[0].data.user.videos.edges
                .map((item) => {
                    return item.node.id
                })
                .slice(0, 5)
            return { username, videoIds: temp }
        })
        .catch(function (error) {
            console.log(error)
        })
}

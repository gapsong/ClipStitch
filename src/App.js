import React from 'react'
import Barchart from './Barchart'
import data from './chatCollection/modifed/621148192.json'

function App() {
    return (
        <div>
            <Barchart data={data} />
        </div>
    )
}

export default App

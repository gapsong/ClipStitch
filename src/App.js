import React from 'react'
import Barchart from './Barchart'
import data from './chatCollection/modified/640810556.json'

function App() {
    return (
        <div>
            <Barchart data={data} />
        </div>
    )
}

export default App

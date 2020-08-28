import React from 'react'
import Barchart from './Barchart'
import data from './chatCollection/final/722429779.json'

function App() {
    return (
        <div>
            <Barchart data={data} />
        </div>
    )
}

export default App

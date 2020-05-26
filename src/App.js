import React from 'react'
import Barchart from './Barchart'
import data from './chatCollection/622947037.json'

function App() {
    return (
        <div>
            <Barchart data={data} />
        </div>
    )
}

export default App

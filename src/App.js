import React from 'react'
import Barchart from './Barchart'
import modified from './chatCollection/final/724101630.json'
import final from './chatCollection/final/723072794.json'

function App() {
    return (
        <div>
            <h1>Modfied</h1>
            {/* <Barchart data={modified} /> */}
            <h1>Final</h1>
            <Barchart data={modified} />
            <Barchart data={final} />
        </div>
    )
}

export default App

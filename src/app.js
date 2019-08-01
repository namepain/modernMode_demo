import React from 'react'

export default () => {

    const log = v => console.log("Let's see if the arrow function is converted.", v)

    log('🍎 app...')

    return (
        <div>
            App
        </div>
    )
}

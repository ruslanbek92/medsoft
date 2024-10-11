import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    console.log('error', error)
    return (
        <div className="error">
            <h1>An error occured</h1>
            {error.status && <p> Error status:{error.status}</p>}
            {error.data && <p>{error.data}</p>}
        </div>
    )
}

export default Error

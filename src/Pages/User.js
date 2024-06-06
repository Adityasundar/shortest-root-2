import React from 'react'
import { useLocation } from 'react-router-dom'

const User = (renderUser) => {
    const {state} = useLocation();

    return (
        <div>
            {renderUser===true ? <h1>{state}</h1> : <h1>No Access</h1>}
        </div>
    )
}

export default User

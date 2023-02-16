import React from 'react'

export default function ProtectedRoute({user, children}) {
    if(!user) {
        return <div>Access Denied!</div>
    }
    return children 
}

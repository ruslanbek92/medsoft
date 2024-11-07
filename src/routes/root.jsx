import { Outlet } from 'react-router-dom'
import React, { useEffect } from 'react'
import Header from '../components/header'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'

function Root() {
    console.log('Root')
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log('onAuthState', user)
            localStorage.setItem('currentUser', JSON.stringify(user))
        })
    }, [])
    return (
        <div className="h-full">
            <Header />
            <Outlet />
        </div>
    )
}

export default Root

import { Outlet } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import Header from '../components/header'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import { AppContext } from '../context'

function Root() {
    const context = useContext(AppContext)
    console.log('Root')
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            console.log('onAuthState', user)
            localStorage.setItem('currentUser', JSON.stringify(user))
            console.log('auth context', context)
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

import { Outlet, useNavigation } from 'react-router-dom'
import React, { useEffect } from 'react'
import Header from '../components/header'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'

function Root() {
    // console.log('Root')
    const navigation = useNavigation()
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            // console.log('onAuthState', user)
            localStorage.setItem('currentUser', JSON.stringify(user))
        })
    }, [])
    return (
        <>
            <Header />
            {navigation.state === 'loading' && 'Yuklanmoqda...'}
            {navigation.state !== 'loading' && <Outlet />}
        </>
    )
}

export default Root

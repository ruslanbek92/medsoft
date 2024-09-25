import React, { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import { auth, db } from '../firebaseconfig'

function MainContent() {
    console.log('MainContent')
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getUser() {
            const { currentUser } = auth
            const docSnap = await getDoc(doc(db, 'users', currentUser.uid))
            const user = docSnap.data()
            setLoading(false)
            if (user.role === 'admin') {
                setRole('admin')
            } else if (user.role === 'registration') {
                setRole('registration')
            } else if (user.role === 'doctor') {
                setRole('doctor')
            }
        }
        getUser()
    }, [])
    return (
        <main className="main">
            {loading ? (
                'loading'
            ) : (
                <>
                    <Sidebar role={role} />
                    <Outlet />
                </>
            )}
        </main>
    )
}

export default MainContent

import React, { useEffect, useState } from 'react'

import { doc, getDoc } from 'firebase/firestore'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import Sidebar from '../components/sidebar'
import { auth, db } from '../firebaseconfig'

function MainContent() {
    console.log('MainContent')
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()
    const navigate = useNavigate()

    async function getUser(user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid))
        const currentUser = docSnap.data()
        setLoading(false)
        if (currentUser.role === 'admin') {
            setRole('admin')
        } else if (currentUser.role === 'registration') {
            setRole('registration')
        } else if (currentUser.role === 'cashier') {
            setRole('cashier')
        } else if (currentUser.role === 'doctor') {
            setRole('doctor')
        } else if (currentUser.role === 'investigator') {
            setRole('investigator')
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('USER', user)
            if (user) {
                getUser(user)
            } else {
                navigate('/')
            }
        })
    }, [navigate])
    return (
        <main className="main">
            {loading ? (
                'loading'
            ) : (
                <>
                    <Sidebar role={role} />
                    {navigation.state === 'loading' && <p>Loading...</p>}
                    {navigation.state !== 'loading' && <Outlet />}
                </>
            )}
        </main>
    )
}

export default MainContent

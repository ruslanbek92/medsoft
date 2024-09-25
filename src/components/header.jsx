import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'

function Header() {
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()
    function handleQuit() {
        auth.signOut().then(() => {
            navigate('/')
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setLogin(true)
            else setLogin(false)
        })
    }, [])
    console.log('Header')
    return (
        <header className="header">
            <h1>MedSoft</h1>
            {login && (
                <button type="button" onClick={handleQuit}>
                    chiqish
                </button>
            )}
        </header>
    )
}

export default Header

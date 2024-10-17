import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseconfig'

function Header() {
    const navigate = useNavigate()

    function handleQuit() {
        auth.signOut().then(() => {
            navigate('/')
        })
    }
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
        <header className="header">
            <h1>MedSoft</h1>
            {user && (
                <button type="button" onClick={handleQuit}>
                    chiqish
                </button>
            )}
        </header>
    )
}

export default Header

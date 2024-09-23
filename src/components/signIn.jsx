import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebaseconfig'

function SignIn() {
    const navigate = useNavigate()
    function handleSignIn(e) {
        e.preventDefault()
        const { login, password } = Object.fromEntries(
            new FormData(e.target).entries()
        )

        signInWithEmailAndPassword(auth, login, password).then(() => {
            navigate('/main')
        })
    }
    return (
        <form className="form" onSubmit={handleSignIn}>
            <h2>Please sign in</h2>
            {/* eslint-disable-next-line */}
            <label htmlFor="login">Login</label>
            <input type="text" id="login" name="login" required />
            {/* eslint-disable-next-line */}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            {/* eslint-disable-next-line */}
            <label htmlFor="submit"></label>
            <button type="submit" id="submit">
                sign in
            </button>
        </form>
    )
}

export default SignIn

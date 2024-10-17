import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebaseconfig'
import Input from './input'

function SignIn() {
    const navigate = useNavigate()
    function handleSignIn(e) {
        e.preventDefault()
        const { login, password } = Object.fromEntries(
            new FormData(e.target).entries()
        )

        signInWithEmailAndPassword(auth, login, password).then(() => {
            console.log('sign in')
            navigate('/main')
        })
    }
    return (
        <form className="form" onSubmit={handleSignIn}>
            <h2>Please sign in</h2>
            {/* eslint-disable-next-line */}
            <Input
                type="text"
                id="login"
                name="login"
                label="Login"
                required={true}
            />
            {/* eslint-disable-next-line */}
            <Input
                type="password"
                id="password"
                name="password"
                label="Password"
                required={true}
            />
            {/* eslint-disable-next-line */}
            <Input type="submit" id="submit" name="submit" />
        </form>
    )
}

export default SignIn

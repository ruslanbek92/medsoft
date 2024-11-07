import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebaseconfig'
import Input from './input'
import { AppContext } from '../context'

function SignIn() {
    const navigate = useNavigate()
    const context = useContext(AppContext)
    function handleSignIn(e) {
        e.preventDefault()
        const { login, password } = Object.fromEntries(
            new FormData(e.target).entries()
        )

        signInWithEmailAndPassword(auth, login, password).then(() => {
            // console.log('sign in')
            context.logToggle()
            // navigate("");
            navigate('/main')
        })
    }
    return (
        <div className=" mt-24 flex justify-center items-center h-full">
            <form
                className="w-2/3 md:w-1/2 lg:w-2/6    p-5 "
                onSubmit={handleSignIn}
            >
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Tizimga kirish
                </h2>
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
                    label="Parol"
                    required={true}
                />
                {/* eslint-disable-next-line */}
                <button
                    className="my-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                >
                    kirish
                </button>
            </form>
        </div>
    )
}

export default SignIn

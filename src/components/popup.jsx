/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebaseconfig'
import { AppContext } from '../context'

export const Popup = ({ onStateChange }) => {
    const navigate = useNavigate()
    const content = useContext(AppContext)
    function handleQuit() {
        auth.signOut().then(() => {
            onStateChange((state) => !state)
            content.setLogged()
            navigate('/')
        })
    }
    return (
        <ul className="position: absolute top-14 right-10 w-40 p-2 bg-white rounded shadow-lg">
            <li>
                <Link to="/main/profile">Profil Sahifasi</Link>
            </li>
            <button
                className="text-red-500 mt-2"
                type="button"
                onClick={handleQuit}
            >
                chiqish
            </button>
        </ul>
    )
}

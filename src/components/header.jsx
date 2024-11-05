import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Hamburger } from './hamburger'
import { Popup } from './popup'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '../firestore/firestore'
import { AppContext } from '../context'

function Header() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const context = useContext(AppContext)
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const { data, isPending } = useQuery({
        queryKey: ['userName'],
        queryFn: () => getCurrentUser(user),
    })
    console.log('user', context.isLogged)
    console.log('Header')
    return (
        <header className="p-4  flex h-18 items-center justify-between bg-cyan-600">
            <Hamburger />
            <h1 className="text-3xl text-white font-bold">
                <Link to={'/main'}>Medsoft</Link>
            </h1>
            {context.isLogged && (
                <>
                    {!isPending && (
                        <div>
                            <img
                                className="mb-2 border-2 border-slate-800 rounded-full cursor-pointer "
                                src=""
                                width="30"
                                height="30"
                                onClick={() =>
                                    setIsPopupOpen((state) => !state)
                                }
                            />
                            {data && (
                                <p className="text-center text-white font-bold">
                                    {data.name}
                                </p>
                            )}
                        </div>
                    )}
                    {isPopupOpen && <Popup onStateChange={setIsPopupOpen} />}
                </>
            )}
        </header>
    )
}

export default Header

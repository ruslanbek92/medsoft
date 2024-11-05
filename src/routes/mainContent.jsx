import {
    Outlet,
    redirect,
    useLoaderData,
    useNavigation,
} from 'react-router-dom'
import Sidebar from '../components/sidebar'
import { getCurrentUser } from '../firestore/firestore'
import React from 'react'

function MainContent() {
    // console.log('MainContent')
    const navigation = useNavigation()
    const role = useLoaderData()
    return (
        <main className="flex">
            {
                <>
                    <Sidebar role={role} />
                    {navigation.state === 'loading' && (
                        <p className="self-center text-center w-4/5">
                            Yuklanmoqda...
                        </p>
                    )}
                    {navigation.state !== 'loading' && <Outlet />}
                </>
            }
        </main>
    )
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    console.log('loader user', user)
    if (user) {
        const currentUser = await getCurrentUser(user)
        return currentUser.role
    } else return redirect('/')
}
export default MainContent

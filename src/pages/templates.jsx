import React from 'react'
import { getCurrentUser } from '../firestore/firestore'
import { redirect } from 'react-router-dom'

export const Templates = () => {
    return (
        <div>
            <h3>Shablonlar</h3>
        </div>
    )
}
export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    console.log('user', user)
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'doctor' ||
            currentUser.role === 'registrator'
        ) {
            return redirect('/')
        } else {
            return null
        }
    } else return null
}

import React from 'react'
import { redirect } from 'react-router-dom'
import { getCurrentUser } from '../firestore/firestore'

function Investigations() {
    return <div>Investigations</div>
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'registration' ||
            currentUser.role === 'doctor'
        ) {
            return redirect('/')
        } else {
            return null
        }
    } else return null
}

export default Investigations

import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import { getPayments } from '../firestore/firestore'
const registrarID = import.meta.env.VITE_REGISTRAR_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID

function Payment() {
    const payments = useLoaderData()
    console.log('payments', payments)
    return (
        <div>
            <h3>To&apos;lovlar</h3>
            <ul>{}</ul>
        </div>
    )
}

export async function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.uid === registrarID ||
                    user.uid === doctorID ||
                    user.uid === investigatorID
                ) {
                    resolve(redirect('/'))
                } else {
                    resolve(getPayments())
                }
            } else resolve(null)
        })
    })
}
export default Payment

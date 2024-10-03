import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebaseconfig'

const registrarID = import.meta.env.VITE_REGISTRAR_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID
function Payment() {
    const payments = useLoaderData()
    console.log('categorized', payments)
    return (
        <div>
            <h3>To&apos;lovlar</h3>
            <ul>{}</ul>
        </div>
    )
}

async function getPayments() {
    const querySnapshot = await getDocs(collection(db, 'payments'))
    const result = querySnapshot.docs.map((item) => item.data())
    return result
}

export async function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('patients auth', user)
                if (
                    user.uid === registrarID ||
                    user.uid === doctorID ||
                    user.uid === investigatorID
                ) {
                    console.log('inner if')
                    resolve(redirect('/'))
                } else {
                    resolve(getPayments())
                }
            } else resolve(null)
        })
    })
}
export default Payment

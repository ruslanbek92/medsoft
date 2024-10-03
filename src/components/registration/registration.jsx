import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { redirect } from 'react-router-dom'
import RegisterForm from './registerForm'
import { auth } from '../../firebaseconfig'

const cashierID = import.meta.env.VITE_CASHIER_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID

function Registration() {
    console.log('registration')
    return <RegisterForm />
}
export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('registration auth', user)
                if (
                    user.uid === cashierID ||
                    user.uid === doctorID ||
                    user.uid === investigatorID
                ) {
                    console.log('inner if')
                    resolve(redirect('/'))
                } else {
                    resolve(null)
                }
            } else resolve(null)
        })
    })
}
export default Registration

import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { redirect } from 'react-router-dom'
import { auth } from '../firebaseconfig'

const cashierID = import.meta.env.VITE_CASHIER_ID
const registrarID = import.meta.env.VITE_REGISTRAR_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
function Investigations() {
    return <div>Investigations</div>
}
export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.uid === cashierID ||
                    user.uid === registrarID ||
                    user.uid === doctorID
                ) {
                    resolve(redirect('/'))
                } else {
                    resolve(null)
                }
            } else resolve(null)
        })
    })
}
export default Investigations

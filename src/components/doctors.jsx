import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { redirect } from 'react-router-dom'
import { auth } from '../firebaseconfig'

const cashierID = import.meta.env.VITE_CASHIER_ID
const registrarID = import.meta.env.VITE_REGISTRAR_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID
function Doctors() {
    return <div>Doctors</div>
}

export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.uid === cashierID ||
                    user.uid === registrarID ||
                    user.uid === doctorID ||
                    user.uid === investigatorID
                ) {
                    resolve(redirect('/'))
                } else {
                    resolve(null)
                }
            } else resolve(null)
        })
    })
}
export default Doctors

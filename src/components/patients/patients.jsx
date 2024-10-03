import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebaseconfig'
import PatientCard from './patientCard'

const cashierID = import.meta.env.VITE_CASHIER_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID

function Patients() {
    const [loading, setLoading] = useState(true)
    const patients = useRef([])
    useEffect(() => {
        async function getPatients() {
            patients.current = (
                await getDocs(collection(db, 'patients'))
            ).docs.map((el) => el.data())
            console.log('patients', patients.current)
            setLoading(false)
        }
        getPatients()
    }, [])

    const content = loading ? (
        'Loading...'
    ) : (
        <ul>
            {patients.current.map((el) => (
                <li key={el['pt-passport']}>
                    <Link to={`${el['pt-passport']}`}>
                        <PatientCard patient={el} />
                    </Link>
                </li>
            ))}
        </ul>
    )
    return content
}

export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('patients auth', user)
                if (user.uid === cashierID || user.uid === investigatorID) {
                    console.log('inner if')
                    resolve(redirect('/'))
                } else {
                    resolve(null)
                }
            } else resolve(null)
        })
    })
}
export default Patients

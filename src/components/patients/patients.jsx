import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import PatientCard from './patientCard'

function Patients() {
    const [loading, setLoading] = useState(true)
    const patients = useRef([])
    useEffect(() => {
        async function getPatients() {
            patients.current = (
                await getDocs(collection(db, 'patients'))
            ).docs.map((el) => el.data())
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

export default Patients

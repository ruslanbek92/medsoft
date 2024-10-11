import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebaseconfig'
import PatientCard from '../components/patients/patientCard'

const cashierID = import.meta.env.VITE_CASHIER_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID

function Patients() {
    const patientsData = useLoaderData()
    return (
        <ul>
            {patientsData.map((el) => (
                <li key={el['pt-passport']}>
                    <Link to={`${el['pt-passport']}`}>
                        <PatientCard patient={el} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}
async function getPatients() {
    const patients = (await getDocs(collection(db, 'patients'))).docs.map(
        (el) => el.data()
    )
    return patients
}
export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.uid === cashierID || user.uid === investigatorID) {
                    resolve(redirect('/'))
                } else {
                    resolve(getPatients())
                }
            } else resolve(null)
        })
    })
}
export async function action() {
    return null
}
export default Patients

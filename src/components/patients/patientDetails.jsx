import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { getCurrentUser } from '../../firestore/firestore'
import { PatientTab } from './PatientTab'

function PatientDetails() {
    const { patient, user } = useLoaderData()
    return (
        <div className=" p-4 pt-8 w-full md:w-4/5">
            <PatientTab patient={patient} user={user} />
        </div>
    )
}

export async function loader({ params }) {
    const documentSnapshot = await getDoc(doc(db, 'patients', params.id))
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    const user = await getCurrentUser(currentUser)
    return {
        patient: { ...documentSnapshot.data(), id: documentSnapshot.id },
        user,
    }
}

export default PatientDetails

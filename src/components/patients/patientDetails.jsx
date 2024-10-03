import React from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import PatientAssign from './patientAssign'

function PatientDetails() {
    const documentSnapshot = useLoaderData()
    const patient = documentSnapshot.data()
    console.log('PAtient details', patient)

    return (
        <div className="pt-detail">
            <p>Bemor ismi: {patient['pt-name']}</p>
            <p>Bemor Familyasi: {patient['pt-surname']}</p>
            <p>Royxatdan otgan sanasi: {patient.dor}</p>
            <p>Tugilgan sanasi: {patient['pt-dob']}</p>
            <p>Qabul turi: {patient['pt-type']}</p>
            <p>Bemor identifikatsion raqami: {patient['pt-passport']}</p>
            <p>Bemor manzili: {patient['pt-address']}</p>
            <PatientAssign patientId={documentSnapshot.id} />
        </div>
    )
}

export async function loader({ params }) {
    return getDoc(doc(db, 'patients', params.id))
}

export default PatientDetails

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { db } from '../firebaseconfig'
import PatientCard from '../components/patients/patientCard'
import { getCurrentUser } from '../firestore/firestore'

function Patients() {
    const patientsData = useLoaderData()
    // console.log('patients', patientsData)
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
async function getPatients(user) {
    const userData = (await getDoc(doc(db, 'users', user.uid))).data()
    let patients
    if (userData.role === 'doctor' || userData.role === 'investigator') {
        patients = await getDoctorOrInvestigatorPatients(userData.name)
    } else
        patients = (await getDocs(collection(db, 'patients'))).docs.map((el) =>
            el.data()
        )
    return patients
}

async function getDoctorOrInvestigatorPatients(serviceProvider) {
    const patientsSnapshot = await getDocs(collection(db, 'patients'))
    const patientsWithDrName = []
    for (const patientDoc of patientsSnapshot.docs) {
        const patientId = patientDoc.id
        const paymentsQuery = query(
            collection(db, `patients/${patientId}/payments`),
            where('serviceProvider', '==', serviceProvider),
            where('status', '==', 'paid')
        )

        const paymentsSnapshot = await getDocs(paymentsQuery)

        if (!paymentsSnapshot.empty) {
            patientsWithDrName.push({
                id: patientId,
                ...patientDoc.data(),
            })
        }
    }

    return patientsWithDrName
}
export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (currentUser.role === 'cashier') {
            return redirect('/')
        } else {
            return getPatients(user)
        }
    } else return null
}

export async function action() {
    return null
}
export default Patients

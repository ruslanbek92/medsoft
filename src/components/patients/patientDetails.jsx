import React, { useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import PatientAssign from './patientAssign'
import { ModalComponent } from '../modalComponent'
import { CashierForm } from '../payments/cashierForm'
import { getCurrentUser } from '../../firestore/firestore'
import { DoctorsField } from './doctorsField'

function PatientDetails() {
    const { patient, user } = useLoaderData()
    const dialogRef = useRef()
    function handleOpenModal() {
        dialogRef.current.open()
    }
    return (
        <>
            <div className="pt-detail">
                <p>Bemor ismi: {patient['pt-name']}</p>
                <p>Bemor Familyasi: {patient['pt-surname']}</p>
                <p>Royxatdan otgan sanasi: {patient.dor}</p>
                <p>Tugilgan sanasi: {patient['pt-dob']}</p>
                <p>Qabul turi: {patient['pt-type']}</p>
                <p>Bemor identifikatsion raqami: {patient['pt-passport']}</p>
                <p>Bemor manzili: {patient['pt-address']}</p>
                <PatientAssign patientId={patient.id} />
                {user.role === 'cashier' && (
                    <>
                        <div className="pt-detail">
                            <button onClick={handleOpenModal}>
                                To&apos;lov qilish
                            </button>
                            <p>Qarzdorlik:{patient.debtAmount}</p>
                        </div>
                        <ModalComponent ref={dialogRef}>
                            <CashierForm
                                onModalClose={() => dialogRef.current.close()}
                            />
                        </ModalComponent>
                    </>
                )}
                {user.role === 'doctor' && <DoctorsField />}
            </div>
        </>
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

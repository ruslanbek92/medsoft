/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../modalComponent'
import { ConsultationView } from './consultationView'

export const Consultations = ({ consultations }) => {
    const dialogRef = useRef()
    const [consultation, setConsultation] = useState(null)
    function handleOpenConsultation(consultation) {
        setConsultation(consultation)
        dialogRef.current.open()
    }
    console.log('consultId', consultation)
    console.log('consultations', consultations)
    return (
        <div className="consultations">
            <h3>Ko&apos;rik qaydlari</h3>
            <ul>
                {consultations.map((item) => (
                    <li className="consultation" key={Date.now()}>
                        {' '}
                        vaqti {new Date(item.date).toDateString()} to&apos;lov
                        id {item.paymentId} konsultatsiya id:{item.id}
                        <button onClick={() => handleOpenConsultation(item)}>
                            ko&apos;rish
                        </button>
                    </li>
                ))}
            </ul>
            <ModalComponent ref={dialogRef}>
                {consultation && (
                    <ConsultationView
                        consultation={consultation}
                        onModalClose={() => dialogRef.current.close()}
                    />
                )}
            </ModalComponent>
        </div>
    )
}

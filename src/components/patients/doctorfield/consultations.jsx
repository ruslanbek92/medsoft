/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../../modalComponent'
import { ConsultationView } from './consultationView'
import { useQuery } from '@tanstack/react-query'
import { getPatientConsultations } from '../../../firestore/firestore'
import { useParams } from 'react-router-dom'

export const Consultations = () => {
    const dialogRef = useRef()
    const params = useParams()
    const [consultation, setConsultation] = useState(null)

    const { data: consultations, isPending: isConsultationsPending } = useQuery(
        {
            queryKey: ['consultations'],
            queryFn: () => getPatientConsultations(params.id),
        }
    )
    function handleOpenConsultation(consultation) {
        setConsultation(consultation)
        dialogRef.current.open()
    }
    // console.log('consultId', consultation)
    // console.log('consultations', consultations)
    return (
        <>
            {isConsultationsPending && 'Yuklanmoqda...'}
            {!isConsultationsPending && (
                <div className="consultations">
                    <h3>Ko&apos;rik qaydlari</h3>
                    <ul>
                        {consultations.map((item) => (
                            <li className="consultation" key={item.date}>
                                {' '}
                                vaqti {new Date(item.date).toDateString()}{' '}
                                to&apos;lov id {item.paymentId} konsultatsiya
                                id:{item.id}
                                <button
                                    onClick={() => handleOpenConsultation(item)}
                                >
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
            )}
        </>
    )
}

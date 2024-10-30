/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

export const ConsultationView = ({ consultation, onModalClose }) => {
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef,
    })
    // console.log("view consultation", consultation.recipes)
    return (
        <>
            <div ref={contentRef}>
                <p>Shikoyatlar: {consultation.complaints}</p>
                <p>Vaqti: {new Date(consultation.date).toDateString()}</p>
                <p>Tashxis: {consultation.diagnosis}</p>
                <p>Docktor: {consultation.doctor}</p>
                <ul>
                    Tavsiya qilingan tekshiruvlar:
                    {consultation.investigations.map((item) => (
                        <li key={Date.now()}>{item}</li>
                    ))}
                </ul>
                <ul>
                    Tavsiya qilingan dorilar:
                    {consultation.recipes.map((item) => (
                        <li key={Date.now()}>
                            {item.drug}, {item.duration} kun {item.frequency}{' '}
                            martadan, {item.complement}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handlePrint}>chop etish</button>
            <button onClick={onModalClose}>yopish</button>
        </>
    )
}

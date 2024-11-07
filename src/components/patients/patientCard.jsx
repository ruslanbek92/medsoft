/* eslint-disable react/prop-types */
import React from 'react'
/* eslint-disable-next-line */
const PatientCard = ({ patient }) => {
    return (
        <div
            className={`p-3 text-slate-200 font-semibold bg-slate-500 border rounded-lg mb-2 shadow-lg ${patient.hasDebt ? 'unpaid' : ''}`}
        >
            <p>{`${patient['pt-name']} ${patient['pt-surname']}`}</p>
            <p>Id: {patient['pt-passport']}</p>
        </div>
    )
}

export default PatientCard

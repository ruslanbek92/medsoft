import React from 'react'
/* eslint-disable-next-line */
const PatientCard = ({ patient }) => {
    return (
        // eslint-disable-next-line react/prop-types
        <div className={`pt-card ${patient.hasDebt ? 'unpaid' : ''}`}>
            {/* eslint-disable-next-line */}
            <p>Id: {patient['pt-passport']}</p>
            {/* eslint-disable-next-line */}
            <p>{`${patient['pt-name']} ${patient['pt-surname']}`}</p>
            {/* eslint-disable-next-line */}
            <p>Registered at: {`${patient.dor}`}</p>
        </div>
    )
}

export default PatientCard

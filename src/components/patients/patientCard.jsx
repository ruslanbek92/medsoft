import React from 'react'
/* eslint-disable-next-line */
const PatientCard = ({ patient }) => {
    return (
        <div className="pt-card">
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

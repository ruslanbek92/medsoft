import React, { useEffect, useRef, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { useParams } from 'react-router-dom'
import { db } from '../../firebaseconfig'

const PatientDetails = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const patientRef = useRef({})

    async function getPatient(patientId) {
        const docSnap = await getDoc(doc(db, 'patients', patientId))
        return docSnap.data()
    }
    useEffect(() => {
        async function fetchData() {
            patientRef.current = await getPatient(id)
            setLoading(false)
        }
        fetchData()
    }, [id])
    const content = loading ? (
        'Loading...'
    ) : (
        <div>{patientRef.current['pt-name']}</div>
    )
    return content
}

export default PatientDetails

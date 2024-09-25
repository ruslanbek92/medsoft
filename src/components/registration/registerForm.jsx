import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Input from '../input'
import { db } from '../../firebaseconfig'

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function createPatient(patient) {
        await setDoc(doc(db, 'patients', patient['pt-passport']), patient)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        const patientData = Object.fromEntries(new FormData(e.target).entries())
        const date = new Date().toString()
        await createPatient({ ...patientData, dor: date })
        setLoading(false)
        navigate('/main/patients')
    }
    const content = loading ? (
        'Loading'
    ) : (
        <form onSubmit={handleSubmit}>
            <Input type="text" id="name" name="pt-name" label="Name" required />
            <Input
                type="text"
                id="surname"
                name="pt-surname"
                label="Surname"
                required
            />
            <Input
                type="text"
                id="passport"
                name="pt-passport"
                label="passport number"
                required
            />
            <Input type="date" id="dob" name="pt-dob" label="DOB" required />
            <div>
                {/* eslint-disable-next-line */}
                <label htmlFor="select">Registered at:</label>
                <select id="select" name="pt-type">
                    <option>OPD</option>
                    <option>IPD</option>
                </select>
            </div>
            <textarea name="pt-address" required />
            {/* eslint-disable-next-line */}
            <Input type="submit" id="address" />
        </form>
    )
    return content
}

export default RegisterForm

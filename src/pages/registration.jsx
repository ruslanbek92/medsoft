import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { auth } from '../firebaseconfig'
import Input from '../components/input'
import { createPatient } from '../firestore/firestore'

const cashierID = import.meta.env.VITE_CASHIER_ID
const doctorID = import.meta.env.VITE_DOCTOR_ID
const investigatorID = import.meta.env.VITE_INVESTIGATOR_ID

function Registration() {
    console.log('registration')
    const navigation = useNavigation()

    const content =
        navigation.state === 'submitting' ? (
            'Submitting'
        ) : (
            <Form method="post">
                <Input
                    type="text"
                    id="name"
                    name="pt-name"
                    label="Name"
                    required
                />
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
                <Input
                    type="date"
                    id="dob"
                    name="pt-dob"
                    label="DOB"
                    required
                />
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
                {navigation.state === 'idle' && (
                    <Input type="submit" id="address" />
                )}
            </Form>
        )
    return content
}
export function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.uid === cashierID ||
                    user.uid === doctorID ||
                    user.uid === investigatorID
                ) {
                    resolve(redirect('/'))
                } else {
                    resolve(null)
                }
            } else resolve(null)
        })
    })
}

export async function action({ request }) {
    const data = await request.formData()
    const patientData = {
        'pt-name': data.get('pt-name'),
        'pt-surname': data.get('pt-surname'),
        'pt-passport': data.get('pt-passport'),
        'pt-type': data.get('pt-type'),
        dor: new Date().toDateString(),
        'pt-dob': data.get('pt-dob'),
        'pt-address': data.get('pt-address'),
    }
    await createPatient(patientData)
    return redirect('/main/patients')
}
export default Registration

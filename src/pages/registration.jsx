import React from 'react'
import { Form, redirect, useNavigation } from 'react-router-dom'
import Input from '../components/input'
import { createPatient, getCurrentUser } from '../firestore/firestore'

function Registration() {
    console.log('registration')
    const navigation = useNavigation()

    const content =
        navigation.state === 'submitting' ? (
            "Jo'natilmoqda"
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

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    console.log('user', user)
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'doctor' ||
            currentUser.role === 'investigator'
        ) {
            return redirect('/')
        } else {
            return null
        }
    } else return null
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

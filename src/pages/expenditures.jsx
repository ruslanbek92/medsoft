import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import { getCurrentUser } from '../firestore/firestore'
import React from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseconfig'
import Input from '../components/input'

export const Expenditures = () => {
    const expenditureTypes = useLoaderData()
    const navigation = useNavigation()
    // console.log("expenditures data", expenditureTypes)
    return (
        <div>
            <h3>Chiqimlar</h3>
            {navigation.state === 'submitting' && "Jo'natilmoqda..."}
            {navigation.state === 'idle' && (
                <Form method="POST" className="expenditure-form">
                    <label>Chiqim turi:</label>
                    <select
                        id="expenditure-select"
                        name="expenditure-select"
                        required
                    >
                        {expenditureTypes.map((item) => (
                            <option key={Date.now()} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <Input
                        type="number"
                        id="expenditure-summ"
                        name="expenditure-summ"
                        label="Chiqim summasi"
                        required={true}
                    />
                    <Input
                        type="text"
                        id="expenditure-notes"
                        name="expenditure-notes"
                        label="Izoh"
                        required={true}
                    />
                    <button>yuborish</button>
                </Form>
            )}
        </div>
    )
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (
            currentUser.role === 'registration' ||
            currentUser.role === 'doctor' ||
            currentUser.role === 'investigator'
        ) {
            return redirect('/')
        } else {
            const doctors = (await getDocs(collection(db, 'doctors'))).docs.map(
                (item) => item.data().name
            )
            const investigators = (
                await getDocs(collection(db, 'investigators'))
            ).docs.map((item) => item.data().name)
            return [...doctors, ...investigators]
        }
    } else return null
}

export async function action({ request }) {
    const data = await request.formData()
    const expenditureObj = {
        type: data.get('expenditure-select'),
        summ: data.get('expenditure-summ'),
        notes: data.get('expenditure-notes'),
        time: new Date(),
    }
    return await addDoc(collection(db, 'expenditures'), expenditureObj)
}

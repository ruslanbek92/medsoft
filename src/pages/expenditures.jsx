import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom'
import { getCurrentUser } from '../firestore/firestore'
import React from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseconfig'
import Input from '../components/input'

export const Expenditures = () => {
    const expenditureTypes = useLoaderData()
    const navigation = useNavigation()
    console.log('expenditures data', expenditureTypes)
    return (
        <div className="p-4 pt-8 w-full md:w-4/5">
            <h2 className="text-2xl pl-2 pb-4 mb-4 font-bold border-b border-b-gray-400 shadow-md">
                Chiqimlar
            </h2>
            {navigation.state === 'submitting' && "Jo'natilmoqda..."}
            {navigation.state === 'idle' && (
                <Form method="POST" className="expenditure-form">
                    <label className="block font-medium mr-2 text-gray-900">
                        Chiqim turi:
                    </label>
                    <select
                        id="expenditure-select"
                        className="block my-2 rounded-md border p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        name="expenditure-select"
                        required
                    >
                        <option value="">Tanlang</option>
                        {expenditureTypes.map((item) => (
                            <option key={item} value={item}>
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
                    <div className=" border-b p-2">
                        <legend className=" font-semibold py-2">
                            To&apos;lov turi:
                        </legend>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="cash"
                                    name="payment-type"
                                    value="cash"
                                    required
                                />
                                <label className="ml-2" htmlFor="cash">
                                    Naqd
                                </label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="card"
                                    name="payment-type"
                                    value="card"
                                    required
                                />
                                <label className="ml-2" htmlFor="cash">
                                    Plastik
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 gap-4 flex justify-end">
                        <button
                            type="reset"
                            className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            bekor qilish
                        </button>
                        <button className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            tayyorlash
                        </button>
                    </div>
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
        paymentType: data.get('payment-type'),
        notes: data.get('expenditure-notes'),
        time: new Date(),
    }
    return await addDoc(collection(db, 'expenditures'), expenditureObj)
}

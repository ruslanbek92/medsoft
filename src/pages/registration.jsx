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
            <div className="p-4 pt-8 w-full md:w-4/5">
                <h2 className="text-2xl pb-4 mb-4 font-bold border-b border-b-gray-500">
                    Registratsiya
                </h2>
                <Form method="post" className="md:w-1/2 ">
                    <Input
                        type="text"
                        id="name"
                        name="pt-name"
                        label="Bemor ismi"
                        required
                    />
                    <Input
                        type="text"
                        id="surname"
                        name="pt-surname"
                        label="Bemor familiyasi"
                        required
                    />
                    <Input
                        type="text"
                        id="passport"
                        name="pt-passport"
                        label="Passport raqami"
                        required
                    />
                    <Input
                        type="date"
                        id="dob"
                        name="pt-dob"
                        label="Tug'ilgan sanasi"
                        required
                    />
                    {/* eslint-disable-next-line */}
                    <label
                        htmlFor="select"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Ambulator/statsionar:
                    </label>
                    <select
                        id="select"
                        name="pt-type"
                        className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    >
                        <option value="">Tanlang</option>
                        <option value="OPD">Statsionar</option>
                        <option value="IPD">Ambulator</option>
                    </select>

                    <label
                        htmlFor="pt-address"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Bemor manzili:
                    </label>
                    <textarea
                        name="pt-address"
                        id="pt-address"
                        className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none"
                        required
                    />
                    {/* eslint-disable-next-line */}
                    {navigation.state === 'idle' && (
                        <div className="flex gap-2 justify-end">
                            <button
                                type="reset"
                                className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                bekor qilish
                            </button>
                            <button
                                type="submit"
                                className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                saqlash
                            </button>
                        </div>
                    )}
                </Form>
            </div>
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

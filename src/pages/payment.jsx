import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getCurrentUser, getPatientsWithDebt } from '../firestore/firestore'

function Payment() {
    const payments = useLoaderData()
    console.log('payments', payments)
    return (
        <div>
            <h3>To&apos;lovlar</h3>
            <ul>
                {payments.map((item) => (
                    <li key={item['pt-passport']} className="pt-card">
                        <Link
                            to={`/main/patients/${item['pt-passport']}`}
                        >{`Name:${item['pt-name']} `}</Link>
                    </li>
                ))}
            </ul>
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
            return getPatientsWithDebt()
        }
    } else return null
}

export default Payment

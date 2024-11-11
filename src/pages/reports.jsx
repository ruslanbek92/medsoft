import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getCurrentUser } from '../firestore/firestore'

function Reports() {
    const user = useLoaderData()
    console.log('user', user)
    let content

    if (user.role === 'doctor') {
        content = (
            <ul className="mt-10 p-4 flex gap-5 font-semibold">
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="doctor-report"
                    >
                        Doktor hisoboti
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="doctor-revision"
                    >
                        Doktor sverkasi
                    </Link>
                </li>
            </ul>
        )
    } else if (user.role === 'investigator') {
        console.log('investigator if')
        content = (
            <ul className="mt-10 p-4 flex gap-5 font-semibold">
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="investigator-report"
                    >
                        Tekshiruvchi hisoboti
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="investigator-revision"
                    >
                        Tekshiruvchi sverkasi
                    </Link>
                </li>
            </ul>
        )
    } else if (user.role === 'admin') {
        content = (
            <ul className="mt-10 p-4 flex gap-5 font-semibold">
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="doctor-report"
                    >
                        Doktor hisoboti
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="doctor-revision"
                    >
                        Doktor sverkasi
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="investigator-report"
                    >
                        Tekshiruvchi hisoboti
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="investigator-revision"
                    >
                        Tekshiruvchi sverkasi
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="cashier-revision"
                    >
                        Kassir sverkasi
                    </Link>
                </li>
                <li>
                    <Link
                        className="p-4 border hover:border-black rounded-md"
                        to="cashier-report"
                    >
                        Kassir hisoboti
                    </Link>
                </li>
            </ul>
        )
    }
    return (
        <div className="p-4 pt-8 w-full md:w-4/5">
            <h2 className="text-2xl pl-2 pb-4 mb-4 font-bold border-b border-b-gray-400 shadow-md">
                Hisobotlar
            </h2>
            {content}
        </div>
    )
}

export async function loader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const currentUser = await getCurrentUser(user)
    if (user) {
        if (
            currentUser.role === 'cashier' ||
            currentUser.role === 'registration'
        ) {
            return redirect('/')
        } else {
            return currentUser
        }
    } else return currentUser
}

export default Reports

import React from 'react'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import { getCurrentUser } from '../firestore/firestore'

function Reports() {
    const user = useLoaderData()
    console.log('user', user)
    let content

    if (user.role === 'doctor') {
        content = (
            <ul>
                <li>
                    <Link to="doctor-report">Doktor hisoboti</Link>
                </li>
                <li>
                    <Link to="doctor-revision">Doktor sverkasi</Link>
                </li>
            </ul>
        )
    } else if (user.role === 'investigator') {
        console.log('investigator if')
        content = (
            <ul>
                <li>
                    <Link to="investigator-report">Tekshiruvchi hisoboti</Link>
                </li>
                <li>
                    <Link to="investigator-revision">
                        Tekshiruvchi sverkasi
                    </Link>
                </li>
            </ul>
        )
    } else if (user.role === 'admin') {
        content = (
            <ul>
                <li>
                    <Link to="doctor-report">Doktor hisoboti</Link>
                </li>
                <li>
                    <Link to="doctor-revision">Doktor sverkasi</Link>
                </li>
                <li>
                    <Link to="investigator-report">Tekshiruvchi hisoboti</Link>
                </li>
                <li>
                    <Link to="investigator-revision">
                        Tekshiruvchi sverkasi
                    </Link>
                </li>
                <li>
                    <Link to="cashier-revision">Kassir sverkasi</Link>
                </li>
                <li>
                    <Link to="cashier-report">Kassir hisoboti</Link>
                </li>
            </ul>
        )
    }
    return (
        <div>
            <h3>Hisobotlar</h3>
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

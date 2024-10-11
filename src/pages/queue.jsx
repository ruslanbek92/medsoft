import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseconfig'
import RoomQueue from '../components/queues/roomQueue'
import { getQueues } from '../firestore/firestore'

const cashierID = import.meta.env.VITE_CASHIER_ID

function Queue() {
    const queues = useLoaderData()

    return (
        <ul>
            {queues.map((el) => (
                <li key={el.id}>
                    <RoomQueue id={el.id} />
                </li>
            ))}
        </ul>
    )
}

export async function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.uid === cashierID) {
                    resolve(redirect('/'))
                } else {
                    resolve(getQueues())
                }
            } else resolve(null)
        })
    })
}
export default Queue

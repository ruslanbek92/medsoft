import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { redirect, useLoaderData } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebaseconfig'
import RoomQueue from './roomQueue'

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
async function getQueues() {
    const querySnapshot = await getDocs(collection(db, 'queues'))
    return querySnapshot.docs
}

export async function loader() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('patients auth', user)
                if (user.uid === cashierID) {
                    console.log('inner if')
                    resolve(redirect('/'))
                } else {
                    resolve(getQueues())
                }
            } else resolve(null)
        })
    })
}
export default Queue

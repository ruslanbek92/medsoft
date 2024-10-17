import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import RoomQueue from '../components/queues/roomQueue'
import { getCurrentUser, getQueues } from '../firestore/firestore'

function Queue() {
    const queues = useLoaderData()
    console.log('queues', queues)
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
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        const currentUser = await getCurrentUser(user)
        if (currentUser.role === 'cashier') {
            return redirect('/')
        } else {
            return getQueues(user, currentUser.role)
        }
    } else return null
}

export default Queue

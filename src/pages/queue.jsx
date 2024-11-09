import React from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import { getCurrentUser, getQueues } from '../firestore/firestore'
import { QueueTab } from '../components/queues/queueTab'

function Queue() {
    const queues = useLoaderData()
    console.log('queues', queues)
    return (
        <div className="p-4 pt-8 w-full md:w-4/5">
            <h2 className="text-2xl pl-2 pb-4 mb-4 font-bold border-b border-b-gray-400 shadow-md">
                Navbatlar
            </h2>
            {/* <ul>
            {queues.map((el) => (
                <li key={el.id}>
                    <RoomQueue id={el.id} />
                </li>
            ))}
        </ul> */}
            <QueueTab queues={queues} />
        </div>
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

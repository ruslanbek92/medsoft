import React from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useLoaderData } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import RoomQueue from './roomQueue'

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
    const querySnapshot = await getDocs(collection(db, 'queues'))
    return querySnapshot.docs
}
export default Queue

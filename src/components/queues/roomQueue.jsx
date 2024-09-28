import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import { db } from '../../firebaseconfig'

/* eslint-disable-next-line */
function RoomQueue({ id }) {
    const [loading, setLoading] = useState(true)
    const [patientsInQueue, setpatientsInQueue] = useState([])

    async function getRoomQueue(roomId) {
        const querySnapshot = await getDocs(
            collection(db, 'queues', roomId, 'queues')
        )
        setpatientsInQueue(
            querySnapshot.docs.map((el) => ({ ...el.data(), id: el.id }))
        )
        setLoading(false)
    }
    async function handleDelete(itemId) {
        setLoading(true)
        await deleteDoc(doc(db, 'queues', id, 'queues', itemId))
        getRoomQueue(id)
    }
    useEffect(() => {
        getRoomQueue(id)
    }, [id])

    const content = (
        <div className="room">
            {loading ? (
                'loading...'
            ) : (
                <>
                    <h3 style={{ textAlign: 'center' }}>{id}</h3>
                    <ul>
                        {patientsInQueue.map((item, index) => (
                            <li className="queue-pt" key={item.name}>
                                Number: {index + 1} Patient: {item.name},
                                Doctor: {item.doctor}{' '}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    o&apos;chirish
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
    return content
}

export default RoomQueue

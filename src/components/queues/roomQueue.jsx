import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import { Link } from 'react-router-dom'
import { db } from '../../firebaseconfig'

/* eslint-disable-next-line */
function RoomQueue({ id }) {
    const [loading, setLoading] = useState(true)
    const [patientsInQueue, setpatientsInQueue] = useState([])
    console.log('Patients in queue', patientsInQueue)
    async function getRoomQueue(roomId) {
        console.log('room id', roomId)
        const querySnapshot = await getDocs(
            collection(db, 'queues', roomId + '', 'queues')
        )

        console.log('SNAPSHOT', querySnapshot.docs)
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
                            <li className="queue-item" key={item.paymentId}>
                                <Link
                                    className="queue-pt"
                                    to={`/main/patients/${item.patientId}?paymentId=${item.paymentId}&queueId=${item.id}&room=${id}`}
                                >
                                    <p>
                                        {' '}
                                        T/R: {index + 1} Bemor: {item.ptName}
                                    </p>
                                    <p>Vaqt: {item.time.toString()}</p>
                                    <p>
                                        Maqomi:{' '}
                                        {item.status === 'waiting'
                                            ? 'kutmoqda'
                                            : item.status === 'inprogress'
                                              ? 'qabulda'
                                              : ''}
                                    </p>
                                    <p>to&apos;lov id: {item.paymentId}</p>
                                </Link>
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

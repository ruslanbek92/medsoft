import React from 'react'
import { deleteDoc, doc } from 'firebase/firestore'

import { Link } from 'react-router-dom'
import { db } from '../../firebaseconfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getRoomQueue } from '../../firestore/firestore'

/* eslint-disable-next-line */
function RoomQueue({ id }) {
    const { data, isPending, refetch } = useQuery({
        queryKey: ['roomQueue', id],
        queryFn: () => getRoomQueue(id),
    })

    const { mutate, isMutationPending } = useMutation({
        mutationFn: ({ itemId }) =>
            deleteDoc(doc(db, 'queues', id, 'queues', itemId)),
        onSuccess: () => {
            alert("navbat o'chirildi!")
            refetch()
        },
    })

    async function handleDelete(itemId) {
        mutate({ itemId })
    }

    const content = (
        <div className="room">
            {isPending || isMutationPending ? (
                'Yuklanmoqda...'
            ) : (
                <>
                    <h3 style={{ textAlign: 'center' }}>{id}</h3>
                    <ul>
                        {data.map((item, index) => (
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

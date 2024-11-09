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
    console.log('data', data)
    const content = (
        <div className="p-4">
            {isPending || isMutationPending ? (
                'Yuklanmoqda...'
            ) : (
                <>
                    <h3 className="font-bold mb-3 text-lg">{id}</h3>
                    <table className="table-auto w-full text-left">
                        <thead className=" w-full bg-gray-50">
                            <tr className="p-3 mb-2 border-b">
                                <th className="px-6 py-3" scope="col">
                                    T/R
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Bemor
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Vaqt
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Maqomi
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    to&apos;lov id:
                                </th>
                                <th className="px-6 py-3" scope="col"></th>
                                <th className="px-6 py-3" scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item.paymentId}
                                    className={`p-3 mb-2 border-b`}
                                >
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{item.ptName}</td>
                                    <td className="px-6 py-3">
                                        {item.time.toDate().toString()}
                                    </td>
                                    <td
                                        className={`px-6 py-3 font-medium ${item.status === 'waiting' ? 'text-indigo-600' : item.status === 'inprogress' ? 'text-lime-600' : ''}`}
                                    >
                                        {item.status === 'waiting'
                                            ? 'kutmoqda'
                                            : item.status === 'inprogress'
                                              ? 'qabulda'
                                              : ''}
                                    </td>
                                    <td className="px-6 py-3">
                                        {item.paymentId}
                                    </td>
                                    <td className="px-6 py-3">
                                        <Link
                                            className=" flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            to={`/main/patients/${item.patientId}?paymentId=${item.paymentId}&queueId=${item.id}&room=${id}`}
                                        >
                                            kirish
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button
                                            className=" flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            type="button"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            o&apos;chirish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    )
    return content
}

export default RoomQueue

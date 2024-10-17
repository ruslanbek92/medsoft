import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { db } from '../../firebaseconfig'

export const DoctorsField = () => {
    const [loading, setLoading] = useState(true)
    const [queue, setQueue] = useState(null)
    const [searchParams] = useSearchParams()
    const params = useParams()
    console.log('params patient', params)
    const paymentId = searchParams.get('paymentId')
    const queueId = searchParams.get('queueId')
    const roomId = searchParams.get('room')
    console.log('room', roomId)
    useEffect(() => {
        async function getQueue(roomId, queueId) {
            const queue = (
                await getDoc(doc(db, 'queues', roomId, 'queues', queueId))
            ).data()
            setQueue(() => queue)
            console.log('Doctor queue', queue)
            setLoading(false)
        }

        getQueue(roomId, queueId)
    }, [])
    async function handleStart() {
        setLoading(true)
        const queueRef = doc(db, 'queues', roomId, 'queues', queueId)
        await updateDoc(queueRef, { status: 'inprogress' })
        const queue = (
            await getDoc(doc(db, 'queues', roomId, 'queues', queueId))
        ).data()
        setQueue(() => queue)
        setLoading(false)
    }

    async function handleStop() {
        setLoading(true)
        const paymentRef = doc(db, 'patients', params.id, 'payments', paymentId)
        console.log('que ref', doc(db, 'queues', roomId, 'queues', queueId))
        await deleteDoc(doc(db, 'queues', roomId, 'queues', queueId))
        await updateDoc(paymentRef, { isProvided: true })
        setQueue(() => null)
        setLoading(false)
    }
    return (
        <div className="dr-field">
            <h3>Doctors field</h3>
            {loading && 'Yuklanmoqda ...'}
            {!loading && (
                <>
                    {queue &&
                        (queue.status === 'waiting' ? (
                            <button onClick={handleStart}>
                                qabulni boshlash
                            </button>
                        ) : queue.status === 'inprogress' ? (
                            <button onClick={handleStop}>
                                qabulni yakunlash
                            </button>
                        ) : (
                            ''
                        ))}
                    {!queue && 'Qabul yakunlangan'}
                </>
            )}
        </div>
    )
}

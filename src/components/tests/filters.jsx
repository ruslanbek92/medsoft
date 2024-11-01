import React from 'react'
import Input from '../input'
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

/* eslint-disable react/prop-types */
export const Filters = ({ onDataChange, data }) => {
    const { data: investigators, isPending: isInvestigatorsPending } = useQuery(
        {
            queryKey: ['investigators'],
            queryFn: async () => {
                return (
                    await getDocs(collection(db, 'investigators'))
                ).docs.map((item) => ({ ...item.data(), id: item.id }))
            },
        }
    )

    const { data: investigations, isPending: isInvestigationsPending } =
        useQuery({
            queryKey: ['investigations'],
            queryFn: async () => {
                return (
                    await getDocs(collection(db, 'investigations'))
                ).docs.map((item) => ({ ...item.data(), id: item.id }))
            },
        })

    function handleSubmit(e) {
        e.preventDefault()
        const roughData = Object.fromEntries(new FormData(e.target))
        let formData = {}
        for (const key in roughData) {
            if (roughData[key]) {
                formData[key] = roughData[key]
            }
        }

        let filteredData = data
        for (const key in formData) {
            if (key === 'acceptance-date') {
                filteredData = filteredData.filter((item) => {
                    if (item.report) return item.report[key] === formData[key]
                    return false
                })
            } else {
                filteredData = filteredData.filter(
                    (item) => item[key] === formData[key]
                )
            }
        }
        onDataChange(filteredData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {isInvestigatorsPending && 'Tekshiruvchilar yuklanmoqda...'}
                {isInvestigationsPending && 'Tekshiruvlar yuklanmoqda...'}

                {!isInvestigatorsPending && (
                    <div>
                        <label htmlFor="investigation">
                            Tekshiruvchi nomiga ko&apos;ra
                        </label>
                        <select name="investigator" id="investigator">
                            <option value="">tekshiruvchini tanlang</option>
                            {investigators.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {!isInvestigationsPending && (
                    <div>
                        <label htmlFor="name">
                            Tekshiruv nomiga ko&apos;ra
                        </label>
                        <select name="name" id="name">
                            <option value="">tekshiruvni tanlang</option>
                            {investigations.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <Input
                    type="date"
                    id="acceptance-date"
                    name="acceptance-date"
                    label="Qabul qilngan sanasiga ko'ra"
                />
                <label htmlFor="status">Tekshiruv maqomiga ko&apos;ra</label>
                <select name="status" id="status">
                    <option value="">maqomni tanlang</option>
                    <option value="waiting">amalga oshirilmagan</option>
                    <option value="inprogress">kutilayotgan</option>
                    <option value="ready">tayyor</option>
                </select>
                <div>
                    <button type="reset">yangilash</button>
                    <button type="submit">qo&apos;llash</button>
                </div>
            </form>
        </div>
    )
}

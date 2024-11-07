import React from 'react'
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
        <div className="p-4 border rounded bg-gray-50">
            <h4 className="font-semibold text-2xl mb-2">Filtrlar</h4>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    {isInvestigatorsPending && 'Tekshiruvchilar yuklanmoqda...'}
                    {isInvestigationsPending && 'Tekshiruvlar yuklanmoqda...'}

                    {!isInvestigatorsPending && (
                        <div>
                            <label
                                htmlFor="investigation"
                                className="font-medium mr-2 text-gray-900"
                            >
                                Tekshiruvchi nomi
                            </label>
                            <select
                                name="investigator"
                                id="investigator"
                                className="rounded-md border p-2    ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            >
                                <option value="">Tanlang</option>
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
                            <label
                                htmlFor="name"
                                className="font-medium mr-2 text-gray-900"
                            >
                                Tekshiruv nomi
                            </label>
                            <select
                                name="name"
                                className="rounded-md border p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                id="name"
                            >
                                <option value="">Tanlang</option>
                                {investigations.map((item) => (
                                    <option key={item.id} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label
                            className="mr-2 font-medium text-gray-900"
                            htmlFor="acceptance-date"
                        >
                            Qabul qilngan sanasi
                        </label>
                        <input
                            className="p-1  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            type="date"
                            id="acceptance-date"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="status"
                            className="font-medium mr-2 text-gray-900"
                        >
                            Tekshiruv maqomi
                        </label>
                        <select
                            name="status"
                            className="rounded-md border p-2   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            id="status"
                        >
                            <option value="">Tanlang</option>
                            <option value="waiting">amalga oshirilmagan</option>
                            <option value="inprogress">kutilayotgan</option>
                            <option value="ready">tayyor</option>
                        </select>
                    </div>
                </div>
                <div className="mt-2 flex gap-2 justify-end">
                    <button
                        type="reset"
                        className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        yangilash
                    </button>
                    <button
                        type="submit"
                        className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        qo&apos;llash
                    </button>
                </div>
            </form>
        </div>
    )
}

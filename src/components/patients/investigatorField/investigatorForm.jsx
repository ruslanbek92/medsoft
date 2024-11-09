/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import Input from '../../input'
import { MedicalInputRow } from './medicalInputRow'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getInvestigationTemplate } from '../../../firestore/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebaseconfig'

export const InvestigatorForm = ({ investigation, onModalClose }) => {
    const [rows, setRows] = useState([])
    const [conclusion, setConclusion] = useState('')
    const formRef = useRef()
    const { data, isPending } = useQuery({
        queryKey: ['investigation-templates', investigation],
        queryFn: () => getInvestigationTemplate(investigation.name),
    })
    console.log('form invstigation', investigation)
    const { mutate, isMutationPending } = useMutation({
        mutationFn: ({ id, report }) => {
            updateDoc(doc(db, 'tests', id), { report, status: 'ready' })
        },
        onSuccess: () => {
            alert("muvaffaqiyatli qo'shildi!")
            onModalClose()
        },
    })
    async function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries())
        console.log('submit data', investigation)
        const report = {
            'acceptance-date': investigation.report['acceptance-date'],
            'preparation-date': new Date(data['ready-date']),
            indicators: rows,
            conclusion: data.conclusion,
        }
        console.log()
        mutate({ id: investigation.paymentId, report: report })
    }

    function handleCancel() {
        setConclusion('')
        setRows([])
    }

    function fillWithTemplate() {
        setConclusion(data.conclusion)
        setRows(data.indicators)
    }
    function handleModalClose() {
        setConclusion('')
        setRows([])
        onModalClose()
    }
    console.log('data', data)
    let content
    if (isPending) content = 'Yuklanmoqda...'
    if (isMutationPending) content = "Jo'natilmoqda..."
    if (!isPending && !isMutationPending)
        content = (
            <>
                {data && (
                    <div className="flex justify-end">
                        <button
                            className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={fillWithTemplate}
                        >
                            shablon bo&apos;yicha to&apos;ldirish
                        </button>
                    </div>
                )}
                <form
                    className="mt-2 p-2  border rounded-md"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <div className="border-b p-4">
                        <Input
                            type="date"
                            id="ready-date"
                            name="ready-date"
                            label="Tayyorlangan sanasi"
                            required={true}
                        />
                    </div>
                    <MedicalInputRow onRowChange={setRows} rows={rows} />
                    <div className="border-b p-4">
                        <label
                            htmlFor="conclusion"
                            className="block pt-2 font-medium"
                        >
                            Xulosa
                        </label>
                        <textarea
                            id="conclusion"
                            name="conclusion"
                            className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none"
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="flex mt-2  gap-2 justify-end">
                        <button
                            type="reset"
                            className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleCancel}
                        >
                            bekor qilish
                        </button>
                        <button
                            className=" flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            yuborish
                        </button>
                    </div>
                </form>
                <button
                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleModalClose}
                >
                    yopish
                </button>
            </>
        )
    // console.log("query data", data)
    return content
}

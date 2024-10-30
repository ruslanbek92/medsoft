/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Input from '../../input'
import { MedicalInputRow } from './medicalInputRow'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getInvestigationTemplate } from '../../../firestore/firestore'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebaseconfig'

export const InvestigatorForm = ({ investigation, onModalClose }) => {
    const [rows, setRows] = useState([])
    const [conclusion, setConclusion] = useState('')
    const { data, isPending } = useQuery({
        queryKey: ['investigation-templates'],
        queryFn: () => getInvestigationTemplate(investigation.name),
    })

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
            'preparation-date': data['ready-date'],
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

    let content
    if (isPending) content = 'Yuklanmoqda...'
    if (isMutationPending) content = "Jo'natilmoqda..."
    if (!isPending && !isMutationPending)
        content = (
            <>
                {data && (
                    <button onClick={fillWithTemplate}>
                        shablon bo&apos;yicha to&apos;ldirish
                    </button>
                )}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="date"
                        id="ready-date"
                        name="ready-date"
                        label="Tayyorlangan sanasi"
                        required={true}
                    />
                    <MedicalInputRow onRowChange={setRows} rows={rows} />
                    <label htmlFor="conclusion">Xulosa</label>
                    <textarea
                        id="conclusion"
                        name="conclusion"
                        value={conclusion}
                        onChange={(e) => setConclusion(e.target.value)}
                        required
                    ></textarea>
                    <button type="reset" onClick={handleCancel}>
                        bekor qilish
                    </button>
                    <button type="submit">yuborish</button>
                    <button onClick={onModalClose}>yopish</button>
                </form>
            </>
        )
    // console.log("query data", data)
    return content
}

/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../modalComponent'
import { MedicalInputRow } from '../patients/investigatorField/medicalInputRow'
import { useMutation } from '@tanstack/react-query'
import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

export const TemplatesComponent = ({ investigations, refetchFn }) => {
    const [formMode, setFormMode] = useState('')
    const [currentInvestigation, setCurrentInvestigation] = useState({})
    const [rows, setRows] = useState([])
    const [conclusion, setConclusion] = useState('')
    const dialogRef = useRef()
    const templates = investigations
        .filter((item) => item.template !== undefined)
        .map((item) => ({ investigationId: item.id, name: item.name, ...item }))
    const investigationsWithoutTemplates = investigations.filter(
        (item) => item.template === undefined
    )
    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, template }) => {
            updateDoc(doc(db, 'investigations', id), { template })
        },
        onSuccess: () => {
            alert("muvaffaqiyatli qo'shildi!")
            setRows([])
            setConclusion('')
            refetchFn()
            dialogRef.current.close()
            setFormMode('')
        },
    })
    const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
        mutationFn: ({ id }) => {
            updateDoc(doc(db, 'investigations', id), {
                template: deleteField(),
            })
        },
        onSuccess: () => {
            alert("shablon muvaffaqiyatli o'chirildi")
            refetchFn()
        },
    })

    function handleView(item) {
        setFormMode('view')
        setCurrentInvestigation(item)
        dialogRef.current.open()
    }

    function handleAddition() {
        setFormMode('add')
        dialogRef.current.open()
    }
    function handleDelete(id) {
        console.log('DELETE')
        deleteMutate({ id })
    }
    function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries())
        let id
        if (formMode === 'add')
            id = investigationsWithoutTemplates.find(
                (item) => item.name === data.name
            ).id
        if (formMode === 'edit') id = currentInvestigation.investigationId
        mutate({
            id,
            template: {
                indicators: rows,
                conclusion,
            },
        })
    }

    function handleEdit() {
        setFormMode('edit')
        setConclusion(currentInvestigation.template.conclusion)
        setRows(currentInvestigation.template.indicators)
        dialogRef.current.open()
    }

    // console.log("investigations", investigations)
    console.log('template current', currentInvestigation)
    return (
        <div className="investigator-field">
            <h3>Shablonlar</h3>
            {isDeletePending && "O'chirilmoqda..."}
            {!isDeletePending && (
                <ul>
                    {templates.map((item) => (
                        <li
                            className="investigation-card"
                            key={item.investigationId}
                        >
                            Nomi: {item.name}
                            <button onClick={() => handleView(item)}>
                                ko&apos;rish
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(item.investigationId)
                                }
                            >
                                o&apos;chirish
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleAddition}>
                yangi shablon qo&apos;shish
            </button>
            <ModalComponent ref={dialogRef}>
                <>
                    {formMode === 'view' && (
                        <div>
                            <p>Nomi:: {currentInvestigation.name}</p>
                            <ul>
                                {currentInvestigation.template.indicators.map(
                                    (item) => (
                                        <li key={item.id}>
                                            {' '}
                                            {`${item.name}        ${item.norm}`}{' '}
                                        </li>
                                    )
                                )}
                            </ul>
                            <p>
                                Xulosa:{' '}
                                {currentInvestigation.template.conclusion}
                            </p>
                            <button onClick={handleEdit}>
                                shablonni tahrirlash
                            </button>
                        </div>
                    )}
                    {(formMode === 'add' || formMode === 'edit') && (
                        <>
                            {isPending && "Jo'natilmoda..."}
                            {!isPending && (
                                <form onSubmit={handleSubmit}>
                                    {formMode === 'add' && (
                                        <>
                                            <label htmlFor="name">
                                                Shablon nomi
                                            </label>
                                            <select
                                                name="name"
                                                id="name"
                                                required
                                            >
                                                <option value="">
                                                    Shablon nomini tanlang
                                                </option>
                                                {investigationsWithoutTemplates.map(
                                                    (item) => (
                                                        <option
                                                            key={item.id}
                                                            value={item.name}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </>
                                    )}
                                    <MedicalInputRow
                                        onRowChange={setRows}
                                        rows={rows}
                                        mode="template"
                                    />
                                    <label htmlFor="conclusion">Xulosa</label>
                                    <textarea
                                        id="conclusion"
                                        name="conclusion"
                                        value={conclusion}
                                        onChange={(e) =>
                                            setConclusion(e.target.value)
                                        }
                                        required
                                    ></textarea>
                                    <button>saqlash</button>
                                </form>
                            )}
                        </>
                    )}
                    <button onClick={() => dialogRef.current.close()}>
                        yopish
                    </button>
                </>
            </ModalComponent>
        </div>
    )
}

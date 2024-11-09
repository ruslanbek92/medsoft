/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import { ModalComponent } from '../modalComponent'
import Input from '../input'
import { useMutation } from '@tanstack/react-query'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

export const InvestigationsComponent = ({
    investigations,
    user,
    onDelete,
    refetchFn,
}) => {
    const [currentInvestigation, setCurrentInvestigation] = useState({
        name: '',
        price: '',
        format: '',
    })
    const [formMode, setFormMode] = useState('')
    const dialogRef = useRef()

    const { mutate, isPending } = useMutation({
        mutationFn: ({ command, newInvestigation, id }) => {
            if (command === 'add')
                addDoc(collection(db, 'investigations'), newInvestigation)
            if (command === 'edit')
                updateDoc(doc(db, 'investigations', id), newInvestigation)
        },
        onSuccess: () => {
            alert('Muvaffaqiyatli bajarildi!')
            refetchFn()
            dialogRef.current.close()
        },
    })
    function handleEdit(investigation) {
        setFormMode('edit')
        setCurrentInvestigation(investigation)
        dialogRef.current.open()
    }
    function handleAddition() {
        setFormMode('addition')
        dialogRef.current.open()
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formMode === 'edit') {
            mutate({
                command: 'edit',
                newInvestigation: {
                    name: currentInvestigation.name,
                    price: +currentInvestigation.price,
                },
                id: currentInvestigation.id,
            })
        } else if (formMode === 'addition') {
            mutate({
                command: 'add',
                newInvestigation: {
                    name: currentInvestigation.name,
                    price: +currentInvestigation.price,
                    format: currentInvestigation.format,
                    type: user.name,
                },
            })
        }
    }
    return (
        <div className="investigator-field">
            <h3>Tekshiruvlar</h3>
            <ul>
                {investigations.map((item) => (
                    <li className="investigation-card" key={item.id}>
                        Nomi: {item.name} summasi: {item.price}
                        <button onClick={() => onDelete(item.id)}>
                            o&apos;chirish
                        </button>
                        <button onClick={() => handleEdit(item)}>
                            tahrirlash
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddition}>
                yangi tekshiruv qo&apos;shish
            </button>
            <ModalComponent ref={dialogRef}>
                {isPending && 'Bajarilmoqda...'}
                {!isPending && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                label="tekshiruv nomi"
                                value={currentInvestigation.name}
                                onChange={(e) =>
                                    setCurrentInvestigation(
                                        (investigation) => ({
                                            ...investigation,
                                            name: e.target.value,
                                        })
                                    )
                                }
                                required={true}
                            />
                            <Input
                                type="text"
                                id="price"
                                name="price"
                                label="tekshiruv summasi"
                                value={currentInvestigation.price}
                                onChange={(e) =>
                                    setCurrentInvestigation(
                                        (investigation) => ({
                                            ...investigation,
                                            price: e.target.value,
                                        })
                                    )
                                }
                                required={true}
                            />

                            <label htmlFor="format">Natija formati</label>
                            <select
                                id="format"
                                name="format"
                                value={currentInvestigation.format}
                                onChange={(e) =>
                                    setCurrentInvestigation(
                                        (investigation) => ({
                                            ...investigation,
                                            format: e.target.value,
                                        })
                                    )
                                }
                                required
                            >
                                <option value="">tanlang</option>
                                <option value="text">Matn</option>
                                <option value="table">Jadval</option>
                            </select>
                            <button type="submit">saqlash</button>
                        </form>
                        <button onClick={() => dialogRef.current.close()}>
                            yopish
                        </button>
                    </>
                )}
            </ModalComponent>
        </div>
    )
}

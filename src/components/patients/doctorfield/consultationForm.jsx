/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Recipe } from './recipe'
import {
    addConsultationOrTemplate,
    getCurrentUser,
    getInvestigationsAndTemplates,
} from '../../../firestore/firestore'
import Input from '../../input'
import { useMutation, useQuery } from '@tanstack/react-query'

export const ConsultationForm = ({
    patientId,
    paymentId,
    onNewConsultAdded,
}) => {
    const [mode, setMode] = useState('registration')
    const [recipes, setRecipes] = useState([])
    const [complaints, setComplaints] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [selectedInvestigations, setSelectedInvestigations] = useState([])

    // console.log("mode", mode)

    const { data, isPending, refetch } = useQuery({
        queryKey: ['templates', 'investigations'],
        queryFn: getInvestigationsAndTemplates,
    })
    //  console.log("data react query", data)

    const { mutate, isPending: isMutationPending } = useMutation({
        queryKey: ['templates', 'consultations'],
        mutationFn: addConsultationOrTemplate,
        onSuccess: () => {
            alert('muvaffaqiyatli yuborildi')
            refetch()
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries())
        const currentUser = await getCurrentUser(
            JSON.parse(localStorage.getItem('currentUser'))
        )

        const consultation = {
            date: new Date(),
            complaints: data.complaints,
            diagnosis: data.diagnosis,
            doctor: currentUser.name,
            investigations: selectedInvestigations,
            patientId,
            paymentId,
            recipes,
        }
        mutate({ mode, name: data['template-name'], consultation })

        setSelectedInvestigations([])
        setRecipes([])
        onNewConsultAdded()
        setComplaints('')
        setDiagnosis('')
        e.target.reset()
        if (mode === 'template') setMode('registration')
    }

    function handleInvestigationChange(e) {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setSelectedInvestigations(selectedOptions)
    }
    function handleSelectChange(e) {
        const currTemplate = data.templates.find(
            (item) => item.name === e.target.value
        )
        setComplaints(currTemplate.complaints)
        setDiagnosis(currTemplate.diagnosis)
        setSelectedInvestigations(currTemplate.investigations)
        setRecipes(currTemplate.recipes)
    }
    function handleAddTemplate() {
        setComplaints('')
        setDiagnosis('')
        setSelectedInvestigations([])
        setRecipes([])
        setMode('template')
    }

    function handleCancel() {
        setComplaints('')
        setDiagnosis('')
        setSelectedInvestigations([])
        setRecipes([])
        if (mode === 'template') setMode('registration')
    }

    return (
        <div
            className={`"pt-consultation" ${mode === 'registration' ? '' : 'pt-template'}`}
        >
            <h3>
                {mode === 'registration'
                    ? "Tibbiy ko'rik formasi"
                    : 'shablon formasi'}
            </h3>
            {isPending && 'Yuklanmoqda...'}
            {isMutationPending && 'Jonatilmoqda...'}
            {!isPending && !isMutationPending && !isMutationPending && (
                <>
                    {mode === 'registration' && (
                        <button onClick={handleAddTemplate}>
                            Shablon qo&apos;shish
                        </button>
                    )}
                    {mode === 'registration' && (
                        <form>
                            <label htmlFor="templates">Shablon tanlash</label>
                            <select
                                name="templates"
                                id="templates"
                                onChange={(e) => handleSelectChange(e)}
                            >
                                {data?.templates.map((item) => (
                                    <option key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </form>
                    )}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="complaints">Shikoyatlari</label>
                        <textarea
                            id="complaints"
                            name="complaints"
                            value={complaints}
                            onChange={(e) => setComplaints(e.target.value)}
                        ></textarea>
                        <label>Tashxisi</label>
                        <textarea
                            name="diagnosis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        ></textarea>
                        <fieldset>
                            <legend>
                                Qilinishi kerak bo&apos;lgan tekshiruvlar
                            </legend>
                            <select
                                id="investigations"
                                value={selectedInvestigations}
                                onChange={handleInvestigationChange}
                                multiple
                            >
                                {data?.investigations?.map((item) => (
                                    <option key={item.name} value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                        <Recipe onRecipeChange={setRecipes} recipes={recipes} />

                        {mode === 'template' && (
                            <Input
                                type="text"
                                name="template-name"
                                id="template-name"
                                label="template-name"
                                required={true}
                            />
                        )}
                        {!!(
                            complaints ||
                            diagnosis ||
                            selectedInvestigations.length ||
                            recipes.length
                        ) &&
                            mode === 'registration' && (
                                <button onClick={handleCancel}>
                                    bekor qilish
                                </button>
                            )}
                        {mode === 'template' && (
                            <button onClick={handleCancel}>bekor qilish</button>
                        )}
                        <button type="submit">saqlash</button>
                    </form>
                </>
            )}
        </div>
    )
}

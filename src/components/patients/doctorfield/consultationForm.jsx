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

    const { data, isPending, refetch } = useQuery({
        queryKey: ['templates', 'investigations'],
        queryFn: getInvestigationsAndTemplates,
    })

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
        console.log('VALUE', e.target.value)
        if (!e.target.value) {
            setComplaints('')
            setDiagnosis('')
            setSelectedInvestigations('')
            setRecipes('')
        } else {
            const currTemplate = data.templates.find(
                (item) => item.name === e.target.value
            )
            setComplaints(currTemplate.complaints)
            setDiagnosis(currTemplate.diagnosis)
            setSelectedInvestigations(currTemplate.investigations)
            setRecipes(currTemplate.recipes)
        }
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
            className={`p-4 mt-4 border rounded-md border-gray-400 shadow-md ${mode === 'registration' ? '' : 'pt-template'}`}
        >
            <h3 className="font-bold mb-3 text-lg">
                {mode === 'registration'
                    ? "Tibbiy ko'rik formasi"
                    : "Shablon qo'shish formasi"}
            </h3>
            {isPending && 'Yuklanmoqda...'}
            {isMutationPending && 'Jonatilmoqda...'}
            {!isPending && !isMutationPending && !isMutationPending && (
                <>
                    {mode === 'registration' && (
                        <button
                            className=" flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleAddTemplate}
                        >
                            Shablon qo&apos;shish
                        </button>
                    )}
                    {mode === 'registration' && (
                        <form className="mt-4">
                            <label htmlFor="templates">Shablon tanlash</label>
                            <select
                                className="rounded border px-1  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                name="templates"
                                id="templates"
                                onChange={(e) => handleSelectChange(e)}
                            >
                                <option value="">-Tanlang-</option>
                                {data?.templates.map((item) => (
                                    <option key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </form>
                    )}
                    <form onSubmit={handleSubmit}>
                        {mode === 'template' && (
                            <Input
                                type="text"
                                name="template-name"
                                id="template-name"
                                label="Shablon nomi"
                                required={true}
                            />
                        )}
                        <label
                            htmlFor="complaints"
                            className="block  font-semibold text-gray-900"
                        >
                            Shikoyatlari
                        </label>
                        <textarea
                            id="complaints"
                            name="complaints"
                            className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none"
                            value={complaints}
                            onChange={(e) => setComplaints(e.target.value)}
                        ></textarea>
                        <label className="block  font-semibold text-gray-900">
                            Tashxisi
                        </label>
                        <textarea
                            name="diagnosis"
                            className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        ></textarea>
                        <fieldset>
                            <legend className="block  font-semibold text-gray-900">
                                Qilinishi kerak bo&apos;lgan tekshiruvlar
                            </legend>
                            <select
                                id="investigations"
                                className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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

                        {!!(
                            complaints ||
                            diagnosis ||
                            selectedInvestigations.length ||
                            recipes.length
                        ) &&
                            mode === 'registration' && (
                                <button
                                    className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleCancel}
                                >
                                    bekor qilish
                                </button>
                            )}
                        <div className="flex gap-2 justify-end">
                            {mode === 'template' && (
                                <button
                                    className="border border-gray-500 rounded-md px-3 py-1.5 text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleCancel}
                                >
                                    bekor qilish
                                </button>
                            )}
                            <button
                                className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                            >
                                saqlash
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

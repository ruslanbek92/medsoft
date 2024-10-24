/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Recipe } from './recipe'
import {
    getCurrentUser,
    getDoctorsOrInvestigations,
} from '../../firestore/firestore'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import Input from '../input'

export const ConsultationForm = ({
    patientId,
    paymentId,
    onNewConsultAdded,
}) => {
    const [mode, setMode] = useState('registration')
    const [loading, setLoading] = useState(false)
    const [investigations, setInvestigations] = useState(null)
    const [templates, setTemplates] = useState([])
    const [recipes, setRecipes] = useState([])
    const [complaints, setComplaints] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [selectedInvestigations, setSelectedInvestigations] = useState([])

    // console.log("mode", mode)
    useEffect(() => {
        async function getInvestigationsAndTemplates() {
            setLoading(true)
            const investigations =
                await getDoctorsOrInvestigations('investigations')
            const templates = (
                await getDocs(collection(db, 'doctor-templates'))
            ).docs.map((item) => ({ ...item.data(), id: item.id }))
            setTemplates(templates)
            setInvestigations(investigations)
            setLoading(false)
        }
        getInvestigationsAndTemplates()
    }, [mode])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
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

        if (mode === 'template') {
            // console.log("handle if")
            await addDoc(collection(db, 'doctor-templates'), {
                ...consultation,
                name: data['template-name'],
            })
        } else {
            await addDoc(collection(db, 'consultations'), consultation)
        }
        setSelectedInvestigations([])
        setRecipes([])
        onNewConsultAdded()
        setComplaints('')
        setDiagnosis('')
        e.target.reset()
        setLoading(false)
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
        const currTemplate = templates.find(
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
            {loading && 'Yuborilmoqda...'}
            {!loading && (
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
                                {templates.map((item) => (
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
                                {investigations?.map((item) => (
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

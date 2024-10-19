/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Recipe } from './recipe'
import {
    getCurrentUser,
    getDoctorsOrInvestigations,
} from '../../firestore/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebaseconfig'

export const ConsultationForm = ({
    patientId,
    paymentId,
    onNewConsultAdded,
}) => {
    const [loading, setLoading] = useState(false)
    const [investigations, setInvestigations] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [selectedInvestigations, setSelectedInvestigations] = useState([])

    useEffect(() => {
        async function getInvestigations() {
            setLoading(true)
            const investigations =
                await getDoctorsOrInvestigations('investigations')
            console.log('investigations', investigations)
            setInvestigations(investigations)
            setLoading(false)
        }
        getInvestigations()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        console.log('Selected Investigations:', selectedInvestigations)
        const data = Object.fromEntries(new FormData(e.target).entries())
        console.log('DATA', data)
        console.log('recipes', recipes)
        const currentUser = await getCurrentUser(
            JSON.parse(localStorage.getItem('currentUser'))
        )
        console.log('doctor', currentUser.name)

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

        await addDoc(collection(db, 'consultations'), consultation)
        setSelectedInvestigations([])
        setRecipes([])
        onNewConsultAdded()
        e.target.reset()
        setLoading(false)
    }

    function handleInvestigationChange(e) {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setSelectedInvestigations(selectedOptions)
    }
    return (
        <div className="pt-consultation">
            <h3>Tibbiy ko&apos;rik formasi</h3>
            {loading && 'Yuborilmoqda...'}
            {!loading && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="complaints">Shikoyatlari</label>
                    <textarea id="complaints" name="complaints"></textarea>
                    <label>Tashxisi</label>
                    <textarea name="diagnosis"></textarea>
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

                    <button type="submit">saqlash</button>
                </form>
            )}
        </div>
    )
}

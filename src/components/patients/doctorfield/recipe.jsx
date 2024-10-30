/* eslint-disable react/prop-types */
import React, { useRef } from 'react'

export const Recipe = ({ onRecipeChange, recipes }) => {
    const form = useRef()
    const drugRef = useRef()
    const durationRef = useRef()
    const frequencyRef = useRef()
    const complementRef = useRef()

    function handleAddRecipe(e) {
        e.preventDefault()
        const newRecipe = {
            id: Date.now(),
            drug: drugRef.current.value,
            duration: durationRef.current.value,
            frequency: frequencyRef.current.value,
            complement: complementRef.current.value,
        }
        recipes.push(newRecipe)
        onRecipeChange((recipes) => recipes.map((item) => ({ ...item })))
        drugRef.current.value =
            durationRef.current.value =
            frequencyRef.current.value =
            complementRef.current.value =
                ''
    }

    function handleDeleteRecipe(id) {
        onRecipeChange((recipes) =>
            recipes
                .filter((item) => item.id !== id)
                .map((item) => ({ ...item }))
        )
    }
    // console.log('recipes', recipes)
    return (
        <fieldset>
            <legend>Retseptlar</legend>
            {recipes.map((item) => (
                <p className="recipe" key={item.id}>
                    {item.drug} {item.duration} kun {item.frequency} Mahal,{' '}
                    {item.complement}{' '}
                    <button onClick={() => handleDeleteRecipe(item.id)}>
                        retseptni o&apos;chirsih
                    </button>
                </p>
            ))}
            <div className="pt-recipe">
                <div className="pt-recipe" ref={form}>
                    <label htmlFor="drug-input">Dori nomi</label>
                    <input type="text" id="drug-input" ref={drugRef} />
                    <label htmlFor="duration-input">Kun</label>
                    <input
                        type="number"
                        id="duration-input"
                        ref={durationRef}
                    />
                    <label htmlFor="frequency-input">Mahal</label>
                    <input
                        type="number"
                        id="frequency-input"
                        ref={frequencyRef}
                    />
                    <label htmlFor="complement-input">Izoh</label>
                    <input
                        type="text"
                        id="complement-input"
                        ref={complementRef}
                    />
                    <button type="submit" onClick={handleAddRecipe}>
                        Retsept qo&apos;shish
                    </button>
                </div>
            </div>
        </fieldset>
    )
}

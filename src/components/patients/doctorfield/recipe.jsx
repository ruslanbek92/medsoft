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
    return (
        <fieldset className="mt-2 p-2 border">
            <legend className="block font-semibold text-gray-900">
                Retseptlar
            </legend>
            {!!recipes.length && (
                <table className="mb-2 table-auto w-full text-left border ">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3" scope="col">
                                Dori nomi
                            </th>
                            <th className="px-6 py-3" scope="col">
                                davomiyligi(kun)
                            </th>
                            <th className="px-6 py-3" scope="col">
                                Chastotasi(mahal)
                            </th>
                            <th className="px-6 py-3" scope="col">
                                Izoh
                            </th>
                            <th className="px-6 py-3" scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((item) => (
                            <tr key={item.id} className="p-3 mb-2 border-b">
                                <td className="px-6 py-3">{item.drug}</td>
                                <td className="px-6 py-3">{item.duration}</td>
                                <td className="px-6 py-3">{item.frequency}</td>
                                <td className="px-6 py-3">{item.complement}</td>
                                <td className="px-6 py-3">
                                    <button
                                        className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() =>
                                            handleDeleteRecipe(item.id)
                                        }
                                    >
                                        retseptni o&apos;chirsih
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div
                className="flex justify-between items-center p-2 border rounded"
                ref={form}
            >
                <div>
                    <label
                        htmlFor="drug-input"
                        className=" text-sm/6 font-medium text-gray-900"
                    >
                        Dori nomi
                    </label>
                    <input
                        type="text"
                        id="drug-input"
                        className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        ref={drugRef}
                    />
                </div>
                <div>
                    <label
                        htmlFor="duration-input"
                        className=" text-sm/6 font-medium text-gray-900"
                    >
                        Kun
                    </label>
                    <input
                        type="number"
                        id="duration-input"
                        className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        ref={durationRef}
                    />
                </div>
                <div>
                    <label
                        htmlFor="frequency-input"
                        className=" text-sm/6 font-medium text-gray-900"
                    >
                        Mahal
                    </label>
                    <input
                        type="number"
                        id="frequency-input"
                        className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        ref={frequencyRef}
                    />
                </div>
                <div>
                    <label
                        htmlFor="complement-input"
                        className=" text-sm/6 font-medium text-gray-900"
                    >
                        Izoh
                    </label>
                    <input
                        type="text"
                        id="complement-input"
                        className="ml-1 p-1 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        ref={complementRef}
                    />
                </div>
                <button
                    type="submit"
                    className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleAddRecipe}
                >
                    Retsept qo&apos;shish
                </button>
            </div>
        </fieldset>
    )
}

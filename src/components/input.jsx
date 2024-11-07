import React from 'react'
/* eslint-disable-next-line */
const Input = ({ type, id, name, label, value, required, ...props }) => {
    return (
        <div>
            <label className="block  font-semibold text-gray-900" htmlFor={id}>
                {label}
            </label>
            {/* eslint-disable-next-line */}
            <input
                className="my-2 p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type={type}
                id={id}
                name={name}
                value={value}
                required={required}
                {...props}
            />
        </div>
    )
}

export default Input

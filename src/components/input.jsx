import React from 'react'
/* eslint-disable-next-line */
const Input = ({ type, id, name, label, value, required, ...props }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            {/* eslint-disable-next-line */}
            <input
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

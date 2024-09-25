import React from 'react'
/* eslint-disable-next-line */
const Input = ({ type, id, name, label, required }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            {/* eslint-disable-next-line */}
            <input type={type} id={id} name={name} required={required} />
        </div>
    )
}

export default Input

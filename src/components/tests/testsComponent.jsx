import React from 'react'

/* eslint-disable react/prop-types */

export const TestsComponent = ({ investigations }) => {
    return (
        <ul>
            {investigations.length === 0 && "Tekshiruvlar yo'q"}
            {investigations.map((item) => (
                <li
                    className={`investigation-card ${item.status === 'waiting' ? 'waiting' : item.status === 'inprogress' ? 'inprogress' : ''}`}
                    key={item.id}
                >
                    <p>Nomi: {item.name}</p>
                    <p>Bemor: {item.ptName}</p>
                    <p>
                        Maqomi:{' '}
                        {item.status === 'waiting'
                            ? 'amalga oshirilmagan'
                            : item.status === 'inprogress'
                              ? 'kutilmoqda'
                              : item.status === 'ready'
                                ? 'tayyor'
                                : ''}
                    </p>
                    <p>Tekshiruvchi: {item.investigator}</p>
                </li>
            ))}
        </ul>
    )
}

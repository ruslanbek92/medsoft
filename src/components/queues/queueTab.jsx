/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import RoomQueue from './roomQueue'

export const QueueTab = ({ queues }) => {
    const [currentTab, setCurrentTab] = useState(queues[0].id)
    return (
        <div className="border border-gray-400 shadow-md rounded-md">
            <nav className="py-6 px-4">
                <ul className="flex gap-6">
                    {queues.map((item, index) => (
                        <li
                            className={`pb-4  font-bold  text-slate-600 cursor-pointer hover:text-gray-900 hover:border-b-2 ${currentTab === item.id ? 'text-indigo-600 border-b-2 border-indigo-600' : ''}`}
                            key={index}
                            onClick={() => setCurrentTab(item.id)}
                        >
                            {item.id}
                        </li>
                    ))}
                </ul>
            </nav>
            <RoomQueue id={currentTab} />
        </div>
    )
}

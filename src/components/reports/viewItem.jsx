/* eslint-disable react/prop-types */
import React from 'react'

export const ViewItem = ({ item, onModalClose }) => {
    console.log('item', item)
    let content
    if (item) {
        content = (
            <>
                <div className="border rounded px-2">
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">Xizmat nomi:</p>
                        <p className="font-semibold text-slate-600">
                            {item.name}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">To&apos;lov Idsi:</p>
                        <p className="font-semibold text-slate-600">
                            {item.id}
                        </p>
                    </div>

                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            to&apos;lov qilingan sana :
                        </p>
                        <p className="font-semibold text-slate-600">
                            {item.type === 'income' &&
                                item['payment-details'].date
                                    .toDate()
                                    .toDateString()}
                            {item.type === 'expenditure' &&
                                item.time.toDate().toDateString()}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">summa:</p>
                        <p className="font-semibold text-slate-600">
                            {item.summ} so&apos;m
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">chegirma:</p>
                        <p className="font-semibold text-slate-600">
                            {item.type === 'income' &&
                                item['payment-details'].discount}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">to&apos;lov turi:</p>
                        <p className="font-semibold text-slate-600">
                            {item.type === 'income' &&
                                (item['payment-details'].type === 'cash'
                                    ? 'naqd'
                                    : 'plastik')}
                            {item.type === 'expenditure' &&
                                (item.paymentType === 'cash'
                                    ? 'naqd'
                                    : 'plastik')}
                        </p>
                    </div>
                    <div className="flex border-b py-2">
                        <p className="font-semibold w-36">
                            yakuniy to&apos;lov:
                        </p>
                        <p className="font-semibold text-slate-600">
                            {item.type === 'income' &&
                                item.summ - item['payment-details'].discount}
                        </p>
                        <p className="font-semibold text-slate-600">
                            {item.type === 'expenditure' && item.summ}
                        </p>
                    </div>
                </div>
                <button
                    className="mt-4 flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onModalClose}
                >
                    yopish
                </button>
            </>
        )
    } else {
        content = <p>No Item yet</p>
    }

    return content
}

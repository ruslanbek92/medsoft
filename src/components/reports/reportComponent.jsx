import React from 'react'

/* eslint-disable react/prop-types */

export const ReportComponent = ({ name, type, incomes, expenditures }) => {
    let content

    if (type === 'report') {
        const income = incomes.reduce(
            (accumulator, item) => accumulator + item.summ,
            0
        )
        const expenditure = expenditures.reduce(
            (accumulator, item) => accumulator + +item.summ,
            0
        )
        content = (
            <>
                <p>Kirimlar: {income} </p>
                <p>Chiqimlar:{expenditure} </p>
                <p>Balans:{income - expenditure}</p>
            </>
        )
    } else if (type === 'revision') {
        const revision = [...incomes, ...expenditures]
        console.log('revision', revision)
        content = (
            <ul>
                {revision.length === 0 && "Kirim chiqimlar yo'q"}
                {revision.map((item) => (
                    <li
                        key={item.id}
                        className={`${item.type === 'income' ? 'income' : item.type === 'expenditure' ? 'expenditure' : ''}`}
                    >
                        nomi:{item.name} Summa:{item.summ} turi: {item.type}{' '}
                        to&apos;langan vaqti:
                        {new Date(item['payment-details']?.date).toDateString()}
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div>
            <h3>
                {type === 'report'
                    ? 'Hisobot'
                    : type === 'revision'
                      ? 'Sverka'
                      : ''}{' '}
                {name}
            </h3>
            {content}
        </div>
    )
}

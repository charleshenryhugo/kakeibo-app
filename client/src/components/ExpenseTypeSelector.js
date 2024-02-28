import React from 'react'
import './ExpenseTypeSelector.css'
import { ExpenseTypeToText } from '../constants/ExpenseType.js'

const ExpenseTypeSelector = ({ expenseType, setExpenseType, expenseTypeOptions }) => {
  return (
    <div className='expenseTypeSelector'>
      {expenseTypeOptions.map((typeOption, index) => (
        <span
          key={index}
          className={`expenseTypeSelector__button ${expenseType === typeOption ? 'active' : ''}`}
          onClick={() => setExpenseType(typeOption)}
        >
          {ExpenseTypeToText[typeOption]}
        </span>
      ))}
    </div>
  )
}

export default ExpenseTypeSelector

import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseTypeSelector.scss'
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

ExpenseTypeSelector.propTypes = {
  expenseType: PropTypes.number.isRequired,
  setExpenseType: PropTypes.func.isRequired,
  expenseTypeOptions: PropTypes.array.isRequired
}

export default ExpenseTypeSelector

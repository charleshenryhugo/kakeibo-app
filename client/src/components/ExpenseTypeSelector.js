import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseTypeSelector.scss'
import { ExpenseType, ExpenseTypeToText } from '../constants/ExpenseType.js'

const ExpenseTypeSelector = ({ expenseType, setExpenseType, expenseTypeOptions = Object.values(ExpenseType) }) => {
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
  expenseTypeOptions: PropTypes.array
}

export default ExpenseTypeSelector

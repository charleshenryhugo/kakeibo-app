import React from 'react'
import PropTypes from 'prop-types'
import './UpdateExpenseForm.scss'
import ExpenseForm from './ExpenseForm'
import LeftArrow from './Icon/LeftArrow'

const UpdateExpenseForm = ({ updatingExpenseItem, onSubmit, onCancel, onItemDelete }) => {
  return (
    <section className='updateExpenseFormWrapper'>
      <div className='updateExpenseForm__header'>
        <span className='updateExpenseForm__button--cancel' onClick={onCancel}>
          <LeftArrow width='1.5rem' height='1.5rem' />
          戻る
        </span>
        <span>支出の編集</span>
        <span></span>
      </div>
      <ExpenseForm updatingExpenseItem={updatingExpenseItem} onSubmit={onSubmit} onCancel={onCancel} onItemDelete={onItemDelete} />
    </section>
  )
}

UpdateExpenseForm.propTypes = {
  updatingExpenseItem: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired
}

export default UpdateExpenseForm

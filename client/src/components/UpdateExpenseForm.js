import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './UpdateExpenseForm.scss'
import LoadingIndicator from './UI/LoadingIndicator'
import DateSelector from './calendar/DateSelector'
import Alert from './UI/Alert'
import Expense from '../repositories/Expense'
import CategoryPicker from './category/CategoryPicker'

const UpdateExpenseForm = ({ expenseItem, onSubmit: onSubmitFunctionFromParent, onCancel: onCancelFunctionFromParent, onItemDelete: onItemDeleteFunctionFromParent }) => {
  const [loading, setLoading] = useState(false)

  const [enteredDate, setEnteredDate] = useState(expenseItem.inputDate)
  const [enteredTitle, setEnteredTitle] = useState(expenseItem.title)
  const [enteredDescription, setEnteredDescription] = useState(expenseItem.description)
  const [enteredAmount, setEnteredAmount] = useState(expenseItem.amount)
  // eslint-disable-next-line no-unused-vars
  const [enteredCategoryId, setEnteredCategoryId] = useState(expenseItem.categoryId)

  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const [year, month, day] = enteredDate.split('-').map((str) => Number(str))
    const updatedExpenseItem = new Expense({
      id: expenseItem.id,
      inputDate: enteredDate,
      lastUpdated: enteredDate,
      year,
      month,
      day,
      title: enteredTitle,
      description: enteredDescription,
      amount: Number(enteredAmount),
      categoryId: enteredCategoryId,
      type: expenseItem.type
    })

    try {
      const data = await updatedExpenseItem.commit()

      if (Number(data.statusCode) === 201) {
        setAlertMessage('入力が成功しました。')
      } else if (Number(data.statusCode) === 200) {
        setAlertMessage('更新が成功しました。')
      } else {
        setAlertMessage('入力が失敗しました。もう一度試してください。')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onSubmitFunctionFromParent(updatedExpenseItem)
      }, 1000)
    } catch (error) {
      setAlertMessage('入力が失敗しました。もう一度試してください。')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }

    setLoading(false)
  }

  const deleteExpenseItem = async () => {
    setLoading(true)

    try {
      const data = await new Expense({ ...expenseItem }).delete()

      if (Number(data.statusCode) === 204) {
        setAlertMessage('削除が成功しました。')
      } else {
        setAlertMessage('削除が失敗しました。もう一度試してください。')
      }

      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onItemDeleteFunctionFromParent(expenseItem)
      }, 1000)
    } catch (error) {
      setAlertMessage('削除が失敗しました。もう一度試してください。')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }

    setLoading(false)
  }

  return (
    <section className='updateExpenseFormWrapper'>
      <Alert show={showAlert} message={alertMessage} />
      <LoadingIndicator show={loading} />
      <form className='updateExpenseForm' onSubmit={onFormSubmit}>
      <div className='updateExpenseForm__inputs'>
          <div className='updateExpenseForm__input'>
            <label htmlFor='expenseDate'>日付</label>
            <DateSelector
              className='updateExpenseForm__dateSelector'
              id="expenseDate"
              date={enteredDate}
              setDate={setEnteredDate}
              minDate={`${expenseItem.year}-${expenseItem.month.toString().padStart(2, '0')}-01`}
              maxDate={`${expenseItem.year}-${expenseItem.month.toString().padStart(2, '0')}-${new Date(expenseItem.year, expenseItem.month, 0).getDate()}`}
            />
          </div>
          <div className='updateExpenseForm__input'>
            <label htmlFor='expenseTitle'>説明</label>
            <input
              id='expenseTitle'
              type='text'
              placeholder='未入力'
              value={enteredTitle} /* 2 way binding */
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>

          <div className='updateExpenseForm__input'>
            <label htmlFor='expenseDescription'>詳細</label>
            <textarea
              id='expenseDescription'
              name='expenseDescription'
              rows='5'
              cols='25'
              value={enteredDescription} /* 2 way binding */
              onChange={(event) => setEnteredDescription(event.target.value)}
            />
          </div>

          <div className='updateExpenseForm__input'>
            <label htmlFor='expenseAmount'>金額</label>
            <input
              id='expenseAmount'
              type='number'
              min='0'
              step='1'
              value={enteredAmount} /* 2 way binding */
              onChange={(event) => setEnteredAmount(event.target.value)}
            />
          </div>
        </div>

        <CategoryPicker categoryId={enteredCategoryId} setCategoryId={setEnteredCategoryId} expenseType={expenseItem.type}/>

        <div className='updateExpenseForm__actions'>
          <button className='updateExpenseForm__submitButton' type='submit'>
            支出を上書きする
          </button>
          <span className='updateExpenseForm__cancelButton' onClick={() => onCancelFunctionFromParent()}>
            戻る
          </span>
        </div>
        <span className='updateExpenseForm__deleteButton' onClick={deleteExpenseItem}>
          削除
        </span>
      </form>
    </section>
  )
}

UpdateExpenseForm.propTypes = {
  expenseItem: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired
}

export default UpdateExpenseForm

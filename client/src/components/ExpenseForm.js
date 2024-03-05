import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './ExpenseForm.scss'
import ExpenseTypeSelector from './ExpenseTypeSelector.js'
import { ExpenseType } from '../constants/ExpenseType.js'
import LoadingIndicator from './UI/LoadingIndicator.js'
import DateSelector from './calendar/DateSelector.js'
import Alert from './UI/Alert.js'
import Expense from '../repositories/Expense.js'
import CategoryPicker from './category/CategoryPicker.js'

const ExpenseForm = ({ onSubmit: onSubmitFunctionFromParent, onCanceled: onCancelFunctionFromParent }) => {
  const today = new Date()
  const [enteredDate, setEnteredDate] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredDescription, setEnteredDescription] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('0')
  const [enteredCategoryId, setEnteredCategoryId] = useState('0')
  const [expenseType, setExpenseType] = useState(ExpenseType.expense)

  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const [year, month, day] = enteredDate.split('-').map((str) => Number(str))
    const newExpenseItem = new Expense({
      inputDate: enteredDate,
      lastUpdated: enteredDate,
      year,
      month,
      day,
      title: enteredTitle,
      description: enteredDescription,
      amount: Number(enteredAmount),
      categoryId: enteredCategoryId,
      type: expenseType
    })

    try {
      const data = await newExpenseItem.commit()

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
      }, 1000)
    } catch (error) {
      setAlertMessage('入力が失敗しました。もう一度試してください。')
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }

    setEnteredTitle('')
    setEnteredDescription('')
    setEnteredAmount('0')
    setEnteredCategoryId('0')

    onSubmitFunctionFromParent(newExpenseItem)

    setLoading(false)
  }

  const [receiptImage, setReceiptImage] = useState({ src: '', alt: '' })
  const onImageUpload = async (event) => {
    setLoading(true)

    const file = event.target.files[0]
    const src = URL.createObjectURL(file)
    const alt = file.name
    setReceiptImage((prevState) => {
      return {
        ...prevState,
        src,
        alt
      }
    })

    const formData = new FormData()
    formData.append('image', file)
    formData.append('src', src)

    const response = await fetch('/api/analyzeReceiptImage', {
      method: 'POST',
      body: formData
    })

    const { result } = await response.json()
    const {
      fields: {
        Items, MerchantAddress, MerchantName, MerchantPhoneNumber, Total, TransactionDate
      }
    } = result

    if (TransactionDate?.value) {
      const date = new Date(TransactionDate.value)
      setEnteredDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`)
    }

    const description = []

    if (TransactionDate?.content) {
      description.push(TransactionDate.content)
    }

    if (MerchantName?.content) {
      setEnteredTitle(MerchantName.content)
      description.push(MerchantName.content)
    }

    if (MerchantAddress?.content) {
      description.push(MerchantAddress.content)
    }

    if (MerchantPhoneNumber?.content) {
      description.push(MerchantPhoneNumber.content)
    }

    if (Items?.values) {
      Items.values.forEach((item) => {
        description.push(item.content.replace(/\n/g, ' '))
      })
    }

    if (Total?.content) {
      description.push(Total.content)
    }

    if (!isNaN(Total?.value)) {
      setEnteredAmount(Total.value)
    }

    setEnteredDescription(description.join('\n'))

    setExpenseType(ExpenseType.expense)

    setLoading(false)
  }

  return (
    <section className='expenseFormWrapper'>
      <Alert show={ showAlert } message={ alertMessage } />
      <LoadingIndicator show={loading} />
      <ExpenseTypeSelector expenseType={expenseType} setExpenseType={setExpenseType} />
      <form className='expenseForm' onSubmit={onFormSubmit}>
        <div className='expenseForm__inputs'>
          <div className='expenseForm__input'>
            <label htmlFor='expenseDate'>日付</label>
            <DateSelector className="expenseForm__dateSelector" id="expenseDate" date={enteredDate} setDate={setEnteredDate} />
          </div>
          <div className='expenseForm__input'>
            <label htmlFor='expenseTitle'>説明</label>
            <input
              id='expenseTitle'
              type='text'
              placeholder='未入力'
              value={enteredTitle} /* 2 way binding */
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>

          <div className='expenseForm__input'>
            <label htmlFor='expenseDescription'>詳細</label>
            <textarea
              id='expenseDescription'
              name='expenseDescription'
              rows='10'
              cols='25'
              value={enteredDescription} /* 2 way binding */
              onChange={(event) => setEnteredDescription(event.target.value)}
            />
          </div>

          <div className='expenseForm__input'>
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

        <CategoryPicker categoryId={enteredCategoryId} setCategoryId={setEnteredCategoryId} expenseType={expenseType}/>

        <div className='expenseForm__actions'>
          <button className='expenseForm__submitButton' disabled={!enteredTitle || isNaN(enteredAmount) || !enteredDate || !enteredCategoryId} type='submit'>
            支出を入力する
          </button>

          <label htmlFor="receiptUpload">レシートをスキャンする</label>
          <input
            id="receiptUpload"
            type="file"
            name="receiptUpload"
            accept="image/*"
            onChange={onImageUpload}
          />
          <div>
            <img id="receiptImage" src={receiptImage.src} alt={receiptImage.alt} height='200'></img>
          </div>
        </div>
      </form>
    </section>
  )
}

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCanceled: PropTypes.func
}

export default ExpenseForm

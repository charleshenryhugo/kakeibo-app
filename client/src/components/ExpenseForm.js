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
import dayjs from 'dayjs'
import Icon from './UI/Icon.js'

const ExpenseForm = ({
  updatingExpenseItem = null,
  onSubmit: onSubmitFunctionFromParent = () => undefined,
  onItemDelete: onItemDeleteFunctionFromParent = () => undefined
}) => {
  const defaultExpenseType = ExpenseType.expense

  const today = dayjs()
  const expenseItem = updatingExpenseItem
    ? new Expense({ ...updatingExpenseItem })
    : new Expense({
      inputDate: today.format('YYYY-MM-DD'),
      lastUpdated: today.format('YYYY-MM-DD'),
      year: today.year(),
      month: today.month() + 1,
      day: today.date(),
      title: '',
      description: '',
      amount: 0,
      categoryId: '0',
      type: defaultExpenseType
    })

  const [enteredDate, setEnteredDate] = useState(expenseItem.lastUpdated)
  const [enteredTitle, setEnteredTitle] = useState(expenseItem.title)
  const [enteredDescription, setEnteredDescription] = useState(expenseItem.description)
  const [enteredAmount, setEnteredAmount] = useState(expenseItem.amount)
  const [enteredCategoryId, setEnteredCategoryId] = useState(expenseItem.categoryId)
  const [expenseType, setExpenseType] = useState(expenseItem.type)

  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const onFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const [year, month, day] = enteredDate.split('-').map((str) => Number(str))
      expenseItem.inputDate = enteredDate
      expenseItem.lastUpdated = enteredDate
      expenseItem.year = year
      expenseItem.month = month
      expenseItem.day = day
      expenseItem.title = enteredTitle
      expenseItem.description = enteredDescription
      expenseItem.amount = Number(enteredAmount)
      expenseItem.categoryId = enteredCategoryId
      expenseItem.type = expenseType

      const data = await expenseItem.commit()

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
        onSubmitFunctionFromParent({ ...expenseItem })
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
    setEnteredCategoryId(0)

    setLoading(false)
  }

  const deleteExpenseItem = async () => {
    setLoading(true)

    if (!updatingExpenseItem) {
      return
    }

    try {
      const data = await new Expense({ ...updatingExpenseItem }).delete()

      if (Number(data.statusCode) === 204) {
        setAlertMessage('削除が成功しました。')
      } else {
        setAlertMessage('削除が失敗しました。もう一度試してください。')
      }

      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onItemDeleteFunctionFromParent(updatingExpenseItem)
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

  const [receiptImage, setReceiptImage] = useState({ src: '', alt: '' })
  const onImageUpload = async (event) => {
    setLoading(true)

    const file = event.target.files[0]

    if (!file) {
      setLoading(false)
      return
    }
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
      setEnteredDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
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
            <DateSelector
              className="expenseForm__dateSelector"
              id="expenseDate"
              date={enteredDate}
              setDate={setEnteredDate}
              minDate={updatingExpenseItem ? `${updatingExpenseItem.year}-${updatingExpenseItem.month.toString().padStart(2, '0')}-01` : '2000-01-01'}
              maxDate={updatingExpenseItem ? `${updatingExpenseItem.year}-${updatingExpenseItem.month.toString().padStart(2, '0')}-${new Date(updatingExpenseItem.year, updatingExpenseItem.month, 0).getDate()}` : '2099-12-31'}
            />
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
              rows='3'
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
              value={enteredAmount} /* 2 way binding */
              onChange={(event) => setEnteredAmount(event.target.value)}
            />
            <span className='expenseForm__inputUnit'>円</span>
          </div>
        </div>

        <CategoryPicker categoryId={enteredCategoryId} setCategoryId={setEnteredCategoryId} expenseType={expenseType} />

        <div className='expenseForm__actions'>
          <button className='expenseForm__actions--submit' disabled={!enteredTitle || isNaN(enteredAmount) || !enteredDate || !enteredCategoryId} type='submit'>
            { updatingExpenseItem ? '支出を上書きする' : '支出を入力する' }
          </button>

          {updatingExpenseItem &&
            <span className='expenseForm__actions--delete' onClick={deleteExpenseItem}>
              削除
            </span>
          }

          {
            !updatingExpenseItem && (
              <>
                <label className='expenseForm__actions--upload' htmlFor="receiptUpload">
                  <Icon name='icon-camera' width='2.5rem' height='2.5rem' fill='#654321'></Icon>
                  レシートをスキャンする
                </label>
                <input
                  id="receiptUpload"
                  type="file"
                  name="receiptUpload"
                  accept="image/*"
                  onChange={onImageUpload}
                  style={{ display: 'none' }}
                />
                <div>
                  <img id="receiptImage" src={receiptImage.src} alt={receiptImage.alt} height='200'></img>
                </div>
              </>
            )
          }
        </div>
      </form>
    </section>
  )
}

ExpenseForm.propTypes = {
  updatingExpenseItem: PropTypes.object,
  onSubmit: PropTypes.func,
  onItemDelete: PropTypes.func
}

export default ExpenseForm

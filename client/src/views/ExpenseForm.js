import React, { useState } from 'react'
import './ExpenseForm.css'
import ExpenseTypeSelector from '../components/ExpenseTypeSelector.js'
import { ExpenseType } from '../constants/ExpenseType.js'
import LoadingIndicator from '../components/LoadingIndicator.js'
// {
//   "id": "59f90b59-704e-46e3-9026-e242bca7971f",
//   "_partitionKey": "",
//   "inputDate": "2021/11/15",
//   "amount(yen)": 63350,
//   "categoryColor": "00c7ff",
//   "categoryIcon": "categoryDefault14",
//   "categoryId": 15,
//   "categoryIndex": 16,
//   "categoryName": "副業",
//   "memo": "company2",
//   "type": "Income"
// }


const ExpenseForm = ({ onSubmit: onSubmitFunctionFromParent, onCanceled: onCancelFunctionFromParent }) => {
  const today = new Date()
  const [enteredDate, setEnteredDate] = useState(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate()}`)
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredDescription, setEnteredDescription] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('0')
  const [enteredCategoryId, setEnteredCategoryId] = useState('0')
  const [expenseType, setExpenseType] = useState(ExpenseType.expense)

  const [loading, setLoading] = useState(false)

  const onFormSubmit = async (event) => {
    event.preventDefault()

    const enteredExpense = {
      inputDate: enteredDate,
      title: enteredTitle,
      description: enteredDescription,
      amount: Number(enteredAmount),
      categoryId: Number(enteredCategoryId),
      type: expenseType,
    }

    setEnteredTitle('')
    setEnteredDescription('')
    setEnteredAmount('0')
    setEnteredCategoryId('0')

    setLoading(true)
    await onSubmitFunctionFromParent(enteredExpense)
    setLoading(false)
  }

  // const onFormCancel = (event) => {
  //   setEnteredTitle('')
  //   setEnteredDescription('')
  //   setEnteredAmount(0)
  //   setEnteredCategoryId(0)
  //   setEnteredType('Expense')

  //   onCancelFunctionFromParent()
  // }

  const [receiptImage, setReceiptImage] = useState({src: '', alt: ''})
  const onImageUpload = async (event) => {
    setLoading(true)

    const file = event.target.files[0]
    const src = URL.createObjectURL(file)
    const alt = file.name
    setReceiptImage((prevState) => {
      return {
        ...prevState,
        src,
        alt,
      }
    })

    const formData = new FormData()
    formData.append('image', file)
    formData.append('src', src)

    const response = await fetch('/api/analyzeReceiptImage', {
      method: 'POST',
      body: formData,
    })

    const { result } = await response.json()
    const { fields: {
      Items, MerchantAddress, MerchantName, MerchantPhoneNumber, Total, TransactionDate
    } } = result

    if (TransactionDate.value) {
      const date = new Date(TransactionDate.value)
      setEnteredDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getDate()}`)
    }

    let description = []

    if (TransactionDate.content) {
      description.push(TransactionDate.content)
    }

    if (MerchantName.content) {
      setEnteredTitle(MerchantName.content)
      description.push(MerchantName.content)
    }

    if (MerchantAddress.content) {
      description.push(MerchantAddress.content)
    }

    if (MerchantPhoneNumber.content) {
      description.push(MerchantPhoneNumber.content)
    }

    if (Items.values) {
      Items.values.forEach((item) => {
        description.push(item.content.replace(/\n/g, ' '))
      })
    }

    if (Total.content) {
      description.push(Total.content)
    }

    if (!isNaN(Total.value)) {
      setEnteredAmount(Total.value)
    }
    
    setEnteredDescription(description.join('\n'))

    setExpenseType(ExpenseType.expense)

    setLoading(false)
  }

  return (
    <section className='expenseForm'>
      <LoadingIndicator show={loading} />
      <ExpenseTypeSelector expenseType={expenseType} setExpenseType={setExpenseType} expenseTypeOptions={Object.values(ExpenseType)}/>
      <form onSubmit={onFormSubmit}>
        <div className='expenseForm__inputs'>
          <div className='expenseForm__input'>
            <label>日付</label>
            <input
              type='date' 
              min='2000-01-01' 
              max='2099-12-31'
              value={enteredDate} /* 2 way binding */
              onChange={(event) => setEnteredDate(event.target.value)}
            />
          </div>
          <div className='expenseForm__input'>
            <label>説明</label>
            <input
              type='text'
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
              cols='20'
              value={enteredDescription} /* 2 way binding */
              onChange={(event) => setEnteredDescription(event.target.value)}
            />
          </div>

          <div className='expenseForm__input'>
            <label>金額</label>
            <input
              type='number'
              min='0'
              step='1'
              value={enteredAmount} /* 2 way binding */
              onChange={(event) => setEnteredAmount(event.target.value)}
            />
          </div>
        </div>

        <div className='expenseForm__categories'>
          カテゴリー
        </div>

        <div className='expenseForm__actions'>
          {/* <button onClick={onFormCancel} type='button'>Cancel</button> */}
          <button disabled={!enteredTitle || isNaN(enteredAmount) || !enteredDate || !enteredCategoryId} type='submit'>
            支出を入力する
          </button>
        </div>

        <div className='expenseForm__input'>
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

export default ExpenseForm

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './CategoryForm.scss'
import { CategoriesContext } from '../../contexts/AppMainContext'
import Alert from '../UI/Alert'
import LoadingIndicator from '../UI/LoadingIndicator'
import Category from '../../repositories/Category'
import { ExpenseType } from '../../constants/ExpenseType'

const CategoryForm = ({ onClose, updatingCategoryItem = null }) => {
  const { setCategories } = useContext(CategoriesContext)

  const categoryItem = updatingCategoryItem
    ? new Category({ ...updatingCategoryItem })
    : new Category({ text: '', iconName: 'cart', iconColor: '#f2f2f2', expenseType: ExpenseType.expense, order: 0 })

  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [enteredText, setEnteredText] = useState(categoryItem?.text ?? '')
  // eslint-disable-next-line no-unused-vars
  const [enteredIconName, setEnteredIconName] = useState(categoryItem.iconName)
  // eslint-disable-next-line no-unused-vars
  const [enteredIconColor, setEnteredIconColor] = useState(categoryItem.iconColor)

  const onSubmit = async () => {
    setLoading(true)
    try {
      categoryItem.text = enteredText
      categoryItem.iconName = enteredIconName
      categoryItem.iconColor = enteredIconColor

      const { statusCode, item } = await categoryItem.commit()
      if (Number(statusCode) === 201) {
        setAlertMessage('入力が成功しました。')
      } else if (Number(statusCode) === 200) {
        setAlertMessage('更新が成功しました。')
      } else {
        setAlertMessage('入力が失敗しました。もう一度試してください。')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onClose()
        setCategories(prev => {
          const index = prev.findIndex((category) => category.id === item.id)
          if (index >= 0) {
            prev[index] = item
          } else {
            prev.push(item)
          }
          return [...prev]
        })
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

  const onDelete = async () => {
    setLoading(true)
    try {
      const { statusCode } = await categoryItem.delete()

      if (Number(statusCode) === 204) {
        setAlertMessage('削除が成功しました。')
      } else {
        setAlertMessage('削除が失敗しました。もう一度試してください。')
      }
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        onClose()
        setCategories(prev => prev.filter((category) => category.id !== categoryItem.id))
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
    <section className='CategoryFormWrapper'>
      <Alert show={ showAlert } message={ alertMessage } />
      <LoadingIndicator show={loading} />
      <div className="categoryForm__header">
        <span className="categoryForm__closeButton" onClick={onClose}>閉じる</span>
        <span className="categoryForm__title">{updatingCategoryItem ? 'カテゴリーの編集' : '新規カテゴリーの追加'}</span>
      </div>
      <section className='categoryForm'>
        <div className='categoryForm__inputs'>
          <div className='categoryForm__input'>
            <label htmlFor='categoryText'>カテゴリー名</label>
            <input
              id='categoryText'
              type='text'
              placeholder='項目名を入力'
              value={enteredText}
              onChange={(event) => setEnteredText(event.target.value)}
            />
          </div>
          <div>アイコン</div>
          <div>カラー</div>
        </div>
        <div className='categoryForm__actions'>
          <span onClick={onSubmit}>保存する</span>
          {updatingCategoryItem ? (<span onClick={onDelete}>削除する</span>) : ''}
        </div>
      </section>
    </section>
  )
}

CategoryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  updatingCategoryItem: PropTypes.object
}

export default CategoryForm

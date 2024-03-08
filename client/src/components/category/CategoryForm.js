import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './CategoryForm.scss'
import { CategoriesContext } from '../../contexts/CategoryContext'
import Alert from '../UI/Alert'
import LoadingIndicator from '../UI/LoadingIndicator'
import Category from '../../repositories/Category'
import CategoryColorPicker from './CategoryColorPicker'
import { CategoryColors, CategoryIconNames } from '../../constants/Category'
import CategoryIconPicker from './CategoryIconPicker'
import LeftArrow from '../Icon/LeftArrow'

const CategoryForm = ({ onClose, updatingCategoryItem = null, expenseType }) => {
  const { setCategories } = useContext(CategoriesContext)

  const categoryItem = updatingCategoryItem
    ? new Category({ ...updatingCategoryItem })
    : new Category({ text: '', iconName: CategoryIconNames[0], iconColor: CategoryColors[0], expenseType, order: 0 })

  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [enteredText, setEnteredText] = useState(categoryItem?.text ?? '')
  const [enteredIconName, setEnteredIconName] = useState(categoryItem.iconName)
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
          const newCategories = [...prev]
          const index = newCategories.findIndex((category) => category.id === item.id)
          if (index >= 0) {
            newCategories[index] = item
          } else {
            newCategories.push(item)
          }
          return newCategories.sort((item1, item2) => item1.order - item2.order)
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
        setCategories(prev => {
          return prev
            .filter((category) => category.id !== categoryItem.id)
            .sort((item1, item2) => item1.order - item2.order)
        })
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
    <section className='categoryFormWrapper'>
      <Alert show={ showAlert } message={ alertMessage } />
      <LoadingIndicator show={loading} />
      <div className="categoryForm__header">
        <span className="categoryForm__closeButton" onClick={onClose}>
          <LeftArrow width='15px' height='15px' /> 閉じる
        </span>
        <span className="categoryForm__title">{updatingCategoryItem ? 'カテゴリーを編集' : 'カテゴリーを作成'}</span>
        <span></span>
      </div>
      <section className='categoryForm'>
        <div className='categoryForm__inputs'>
          <div className='categoryForm__input categoryForm__inputText'>
            <label htmlFor='categoryText'>カテゴリー名</label>
            <input
              id='categoryText'
              type='text'
              placeholder='項目名を入力'
              value={enteredText}
              onChange={(event) => setEnteredText(event.target.value)}
            />
          </div>
          <div className='categoryForm__input'>
            アイコン
            <CategoryIconPicker iconName={enteredIconName} setIconName={setEnteredIconName} iconColor={enteredIconColor} />
          </div>
          <div className='categoryForm__input'>
            カラー
            <CategoryColorPicker color={enteredIconColor} setColor={setEnteredIconColor} />
          </div>
        </div>
        <div className='categoryForm__actions'>
          <span className='categoryForm__actions--submit' onClick={onSubmit}>保存する</span>
          {updatingCategoryItem ? (<span className='categoryForm__actions--delete' onClick={onDelete}>削除する</span>) : ''}
        </div>
      </section>
    </section>
  )
}

CategoryForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  updatingCategoryItem: PropTypes.object,
  expenseType: PropTypes.number.isRequired
}

export default CategoryForm

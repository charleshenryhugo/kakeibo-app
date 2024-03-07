import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CategoriesContext } from '../../contexts/AppMainContext'
import './CategoryList.scss'
import RightArrow from '../Icon/RightArrow'
import LeftArrow from '../Icon/LeftArrow'
import ExpenseTypeSelector from '../ExpenseTypeSelector'
import { ExpenseType } from '../../constants/ExpenseType'
import CategoryForm from './CategoryForm'
import Icon from '../UI/Icon'

const CategoryList = ({ onClose }) => {
  const {
    categories,
    categoryFormOpen,
    setCategoryFormOpen,
    updatingCategoryItem,
    setUpdatingCategoryItem
  } = useContext(CategoriesContext)
  const [expenseType, setExpenseType] = useState(ExpenseType.expense)

  const onCategoryItemClick = (item) => {
    setUpdatingCategoryItem(() => item)
    setCategoryFormOpen(true)
  }
  const onNewCategoryItemClick = () => {
    setUpdatingCategoryItem(() => null)
    setCategoryFormOpen(true)
  }

  return (
    <section className='categoryListWrapper'>
      <div className='categoryList__header'>
        <span className='categoryList__closeButton' onClick={onClose}>
          <LeftArrow width='15px' height='15px'/>
          <span>閉じる</span>
        </span>
        <ExpenseTypeSelector expenseType={expenseType} setExpenseType={setExpenseType} />
        <span></span>
      </div>
      <div className='categoryList__addNew' onClick={onNewCategoryItemClick}>
        <span>新規カテゴリーの追加</span>
        <RightArrow width='10px' height='10px'></RightArrow>
      </div>
      <div className='categoryList'>
        {categories
          .filter(item => item.expenseType === expenseType)
          .map((item, index) => {
            return (
              <div
                key={index}
                className='categoryList__item'
                onClick={() => onCategoryItemClick(item)}
              >
                <span className='categoryList__itemName'>
                  <Icon name={item.iconName} fill={item.iconColor} width='1.6rem' height='1.6rem' />
                  {item.text}
                </span>
                <RightArrow width='10px' height='10px'></RightArrow>
              </div>
            )
          })}
      </div>
      {categoryFormOpen &&
        <CategoryForm
          onClose={() => setCategoryFormOpen(false)}
          updatingCategoryItem={updatingCategoryItem}
          expenseType={expenseType}
        />}
    </section>

  )
}

CategoryList.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default CategoryList

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { CategoriesContext } from '../../contexts/AppMainContext'
import './CategoryList.scss'
import RightArrow from '../Icon/RightArrow'
import LeftArrow from '../Icon/LeftArrow'
import ExpenseTypeSelector from '../ExpenseTypeSelector'
import { ExpenseType } from '../../constants/ExpenseType'
import CategoryForm from './CategoryForm'

const CategoryList = ({ onClose }) => {
  const { categories } = useContext(CategoriesContext)
  const [expenseType, setExpenseType] = useState(ExpenseType.expense)
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [updateCategoryFormOpen, setUpdateCategoryFormOpen] = useState(false)
  const [updatingCategoryItem, setUpdatingCategoryItem] = useState(null)
  const onCategoryItemClick = (item) => {
    setUpdatingCategoryItem(() => item)
    setUpdateCategoryFormOpen(true)
  }

  return (
    <section className='categoryListWrapper'>
      <div className='categoryList__header'>
        <span className='categoryList__closeButton' onClick={onClose}>
          <LeftArrow width='20px' height='20px'/>
          <span>閉じる</span>
        </span>
        <ExpenseTypeSelector expenseType={expenseType} setExpenseType={setExpenseType} />
        <span></span>
      </div>
      <div className='categoryList__addNew' onClick={() => setCategoryFormOpen(true)}>
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
                <span>{item.iconName} {item.text}</span>
                <RightArrow width='10px' height='10px'></RightArrow>
              </div>
            )
          })}
      </div>
      {updateCategoryFormOpen && <CategoryForm onClose={() => setUpdateCategoryFormOpen(false)} updatingCategoryItem={updatingCategoryItem}/>}
      {categoryFormOpen && <CategoryForm onClose={() => setCategoryFormOpen(false)} />}
    </section>

  )
}

CategoryList.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default CategoryList
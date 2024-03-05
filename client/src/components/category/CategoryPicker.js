import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import './CategoryPicker.scss'
import { CategoriesContext } from '../../contexts/AppMainContext'
import RightArrow from '../Icon/RightArrow'
import CategoryList from './CategoryList'
import { ExpenseType } from '../../constants/ExpenseType'

const CategoryPicker = ({ categoryId, setCategoryId, expenseType = ExpenseType.expense }) => {
  const { categories } = useContext(CategoriesContext)
  const [categoryListOpen, setCategoryListOpen] = useState(false)

  return (
    <section className='categoryPicker'>
      {categories.filter(category => category.expenseType === expenseType).map((category, index) => (
        <div
          key={index}
          className={`categoryPicker__item ${category.id === categoryId ? 'selected' : ''}`}
          onClick={() => setCategoryId(category.id)}
        >
          {category.text}
        </div>
      ))}
      <div className='categoryPicker__item' onClick={() => setCategoryListOpen(true)}>
        <span>編集・追加 <RightArrow width="10px" height="10px"></RightArrow></span>
      </div>
      {categoryListOpen && <CategoryList onClose={() => setCategoryListOpen(false)}/>}
    </section>
  )
}

CategoryPicker.propTypes = {
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setCategoryId: PropTypes.func.isRequired,
  expenseType: PropTypes.number
}

export default CategoryPicker

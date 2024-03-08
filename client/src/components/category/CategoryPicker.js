import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './CategoryPicker.scss'
import { CategoriesContext } from '../../contexts/CategoryContext'
import RightArrow from '../Icon/RightArrow'
import { ExpenseType } from '../../constants/ExpenseType'
import Icon from '../UI/Icon'

const CategoryPicker = ({ categoryId, setCategoryId, expenseType = ExpenseType.expense }) => {
  const { categories, setCategoryListOpen } = useContext(CategoriesContext)

  return (
    <section className='categoryPicker'>
      {categories.filter(category => category.expenseType === expenseType).map((category, index) => (
        <div
          key={index}
          className={`categoryPicker__item ${category.id === categoryId ? 'selected' : ''}`}
          onClick={() => setCategoryId(category.id)}
        >
          <Icon name={category.iconName} fill={category.iconColor} width='2rem' height='2rem'/>
          {category.text}
        </div>
      ))}
      <div className='categoryPicker__item' onClick={() => setCategoryListOpen(true)}>
        <span>編集・追加 <RightArrow width="10px" height="10px"></RightArrow></span>
      </div>
    </section>
  )
}

CategoryPicker.propTypes = {
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setCategoryId: PropTypes.func.isRequired,
  expenseType: PropTypes.number
}

export default CategoryPicker

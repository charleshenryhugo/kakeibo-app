import React from 'react'
import PropTypes from 'prop-types'
import './CategoryColorPicker.scss'

import { CategoryColors } from '../../constants/Category'

const CategoryColorPicker = ({ color, setColor }) => {
  return (
    <section className='categoryColorPicker'>
      {CategoryColors.map((categoryColor, index) => (
        <div
          key={index}
          className={`categoryColorPicker__item ${color === categoryColor ? 'selected' : ''}`}
          onClick={() => setColor(categoryColor)}
          style={{ backgroundColor: categoryColor }}
        ></div>
      ))}
    </section>
  )
}

CategoryColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired
}

export default CategoryColorPicker

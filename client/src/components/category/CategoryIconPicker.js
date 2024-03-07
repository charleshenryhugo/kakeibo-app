import React from 'react'
import PropTypes from 'prop-types'
import './CategoryIconPicker.scss'
import { CategoryIconNames } from '../../constants/Category'
import Icon from '../UI/Icon'

const CategoryIconPicker = ({ iconName, setIconName, iconColor }) => {
  return (
    <div className='categoryIconPicker'>
      {CategoryIconNames.map((name, index) => (
        <div
          key={index}
          className={`categoryIconPicker__item ${name === iconName ? 'selected' : ''}`}
          onClick={() => setIconName(name)}
        >
          <Icon name={name} fill={iconColor} width='3rem' height='3rem' />
        </div>
      ))}
    </div>
  )
}

CategoryIconPicker.propTypes = {
  iconName: PropTypes.string.isRequired,
  setIconName: PropTypes.func.isRequired,
  iconColor: PropTypes.string
}

export default CategoryIconPicker

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './CategoryIconPicker.scss'
import { CategoryIconNames } from '../../constants/Category'

const CategoryIconPicker = ({ iconName, setIconName, iconColor }) => {
  const [icons, setIcons] = useState([])

  useEffect(() => {
    const loadIcons = () => {
      const loadedIcons = CategoryIconNames.map((name) => {
        // const { ReactComponent } = await import(`../../svgs/${iconName}.svg`)
        return { name }
      })
      setIcons(() => loadedIcons)
    }

    loadIcons()
  }, [])

  return (
    <div className='categoryIconPicker'>
      {icons.map(({ name, IconComponent }, index) => (
        <div
          key={index}
          className={`categoryIconPicker__item ${name === iconName ? 'selected' : ''}`}
          onClick={() => setIconName(name)}
        >
          {/* <IconComponent fill={iconColor} /> */}
          {name}
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

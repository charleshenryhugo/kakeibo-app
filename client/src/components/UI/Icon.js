import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ name, fill = '#333333', width = '15px', height = '15px' }) => {
  return (
    <svg fill={fill} width={width} height={height}>
      <use xlinkHref={`icons.svg#${name}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

export default Icon

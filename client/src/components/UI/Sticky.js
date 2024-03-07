import React from 'react'
import PropTypes from 'prop-types'

const StickyTop = ({ children, top = '0', ...inputStyles }) => {
  return (
    <section
      style={{
        position: 'sticky',
        top,
        ...inputStyles
      }}
    >
      {children}
    </section>
  )
}

StickyTop.propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.string
}

export default StickyTop

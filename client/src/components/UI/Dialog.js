import React from 'react'
import PropTypes from 'prop-types'
import './Dialog.scss'

const Dialog = ({ children, show }) => {
  return (
    <section className={`dialogWrapper ${show ? '' : 'hidden'}`}>
      <div className='dialogContent'>
        {children}
      </div>
    </section>
  )
}

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired
}

export default Dialog

import React from 'react'
import PropTypes from 'prop-types'
import './Alert.scss'

const Alert = ({ show, message }) => {
  return (
    <section className={`alertWrapper ${show ? '' : 'hidden'}`}>
      <div className="alert">
        {message}
      </div>
    </section>
  )
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}

export default Alert

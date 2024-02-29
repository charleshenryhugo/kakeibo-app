import React from 'react'
import PropTypes from 'prop-types'
import './LoadingIndicator.css'

const LoadingIndicator = ({ show }) => {
  return (
    <section className={`loadingIndicatorWrapper ${show ? '' : 'hidden'}`}>
      <div className="loadingIndicator">
        loading...
      </div>
    </section>
  )
}

LoadingIndicator.propTypes = {
  show: PropTypes.bool.isRequired
}

export default LoadingIndicator

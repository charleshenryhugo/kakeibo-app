import React from 'react'
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

export default LoadingIndicator

import React from 'react'
import Loader from 'react-loaders'

const Loading = ({ message }) => {
  return (
    <div className="loader-container">
      <div className="loader-container__inner">
        <div className="text-center">
          <Loader type="ball-pulse-rise"/>
        </div>
        {message && <h6>{message}</h6>}
      </div>
    </div>
  )
}

export default Loading

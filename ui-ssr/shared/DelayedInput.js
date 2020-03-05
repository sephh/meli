import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const DelayedInput = ({ delay, value: initialValue, onChange, ...props }) => {
  const [value, setValue] = useState(initialValue)
  const emit = useRef((text) => {
    onChange(text)
  })

  const handleTextChange = (e) => {
    const inputValue = e.target.value
    setValue(inputValue)
    emit.current(inputValue)
  }

  useEffect(() => {
    emit.current = _.debounce(emit.current, delay);
  }, [delay])

  return (
    <input
      {...props}
      onChange={handleTextChange}
      value={value}
    />
  )
}

DelayedInput.propTypes = {
  value: PropTypes.string,
  delay: PropTypes.number,
  onChange: PropTypes.func
}

DelayedInput.defaultProps = {
  value: '',
  delay: 500,
  onChange: () => undefined
}


export default DelayedInput

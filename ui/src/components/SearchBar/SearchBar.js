import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SearchBarButton from './SearchBarButton'
import DelayedInput from '../../shared/DelayedInput'

import logoImage from '../../assets/img/Logo_ML.png'
import { Link } from 'react-router-dom'

const SearchBar = ({ value: initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (v) => {
    setValue(v)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()

    if (value) {
      onChange(value)
    }
  }

  return (
    <form onSubmit={onSubmit}>

      <div className='search-bar'>

        <div className='container'>

          <div className='search-bar__input-group'>

            <div className='search-bar__logo'>
              <Link to={'/'}><img src={logoImage} alt='Logomarca'/></Link>
            </div>

            <div className='search-bar__input'>

              <DelayedInput
                className='ml-input ml-input--md'
                placeholder='Nunca dejes de buscar'
                delay={0}
                value={value}
                onChange={handleChange}
              />

            </div>

            <div className='search-bar__button'>

              <SearchBarButton
              />

            </div>

          </div>

        </div>

      </div>

    </form>
  )
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

SearchBar.defaultProps = {
  value: '',
  onChange: () => undefined
}

export default SearchBar

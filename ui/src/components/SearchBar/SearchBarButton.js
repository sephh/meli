import React from 'react'
import PropTypes from 'prop-types'

import searchIcon from '../../assets/img/ic_Search.png';

const SearchBarButton = ({onClick}) => {
  return (
    <button
      className={'search-bar-button ml-btn'}
      type='submit'
      onClick={e => onClick(e)}
    >
      <img src={searchIcon} alt={'Search Icon'}/>
    </button>
  )
}

SearchBarButton.propTypes = {
  onClick: PropTypes.func
}

SearchBarButton.defaultProps = {
  onClick: () => undefined
}

export default SearchBarButton

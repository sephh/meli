import React, { Component } from 'react'
import _ from 'lodash';

import SearchBar from '../components/SearchBar'

class SearchBarView extends Component {
  requestItems = (query) => {
    const { history } = this.props
    history.push(`/items?search=${_.deburr(query)}`)
  }

  render() {
    return (
      <div className='search-bar-view'>
        <SearchBar
          onChange={this.requestItems}
        />
      </div>
    )
  }
}

export default SearchBarView

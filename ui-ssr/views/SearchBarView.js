import React, { Component } from 'react'
import _ from 'lodash';

import SearchBar from '../components/SearchBar'
import Router from 'next/router'

class SearchBarView extends Component {
  requestItems = (query) => {
    Router.push(`/items?search=${_.deburr(query)}`)
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

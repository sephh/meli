import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import _ from 'lodash'

import item from '../reducers/item'
import Breadcrumbs from '../shared/Breadcrumbs'
import Loading from '../shared/Loading'
import ItemsCard from '../components/ItemsCard'

class SearchResultsView extends Component {
  componentDidMount() {
    this.requestItems()
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location.search, prevProps.location.search)) {
      this.requestItems()
    }
  }

  requestItems = () => {
    const { getItems, location } = this.props
    const { q } = queryString.parse(location.search)

    getItems(q)
  }

  render() {
    const { breadcrumbsLinks, loading, items } = this.props

    return (
      <Fragment>
        {
          loading
            ? <Loading message={'Estamos encontrando su producto...'}/>
            :
            <div className='search-results-view animated animated--fadeIn'>

              <div className='container'>

                <Breadcrumbs
                  links={breadcrumbsLinks}
                />

                <ItemsCard
                  items={items}
                />

              </div>

            </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const items = item.selectors.items(state)
  const [firstItem] = items

  const categories = firstItem
    ? item.selectors.getItemCategories(state)(firstItem.id)
    : []

  return {
    items: items.slice(0, 4),
    loading: item.selectors.loadingItems(state),
    breadcrumbsLinks: categories.map(category => ({
      url: `/items?q=${category}`,
      label: category
    }))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItems: (query) => dispatch(item.actions.getItems({ query }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsView)

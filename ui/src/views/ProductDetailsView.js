import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import item from '../reducers/item'
import Breadcrumbs from '../shared/Breadcrumbs'
import Loading from '../shared/Loading'
import ItemDetails from '../components/ItemDetails'
import ItemNotFound from '../components/ItemDetails/ItemNotFound'

class ProductDetailsView extends Component {
  componentDidMount() {
    this.requestItems()
  }

  requestItems = () => {
    const { getItem, match } = this.props
    const { id } = match.params

    getItem(id)
  }

  render() {
    const { breadcrumbsLinks, loading, selectedItem } = this.props

    return (
      <Fragment>
        {
          loading
            ? <Loading message={'Estamos encontrando su producto...'}/>
            :
            <div className='product-details-view animated animated--fadeIn'>

              <div className='container'>

                <Breadcrumbs
                  links={breadcrumbsLinks}
                />

                {
                  selectedItem &&
                  <ItemDetails
                    item={selectedItem}
                  />
                }

                {
                  !selectedItem && !loading &&
                  <ItemNotFound/>
                }


              </div>

            </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  const selectedItem = item.selectors.selectedItem(state)

  const categories = selectedItem
    ? selectedItem.categories
    : []

  return {
    selectedItem,
    loading: item.selectors.loadingItems(state),
    breadcrumbsLinks: categories.map(category => ({
      url: `/items?q=${category}`,
      label: category
    }))
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItem: (id) => dispatch(item.actions.getItem({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsView)

import React, { Fragment, lazy, Suspense } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import Loading from '../shared/Loading'

/** ROUTES */
const SearchResultsView = lazy(() => import( '../views/SearchResultsView'))
const ProductDetailsView = lazy(() => import( '../views/ProductDetailsView'))

const ItemRoutes = () => {

  return (
    <Fragment>
      <div className="app-main">
        <div className="app-main__inner">
          <Suspense fallback={
            <Loading/>
          }>

            <Switch>

              <Route exact path={'/items'} component={SearchResultsView}/>

              <Route exact path={'/items/:id'} component={ProductDetailsView}/>

            </Switch>

          </Suspense>

        </div>
      </div>


    </Fragment>
  )
}

export default ItemRoutes

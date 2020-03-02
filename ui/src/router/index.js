import React, { Fragment, lazy, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Loading from '../shared/Loading'

/** AUTH */

const SearchBarView = lazy(() => import('../views/SearchBarView'))

const ItemRoutes = lazy(() => import('./ItemRoutes'))

const Router = () => {
  return (
    <BrowserRouter>
      <Fragment>

        <Suspense fallback={
          <Loading message="Por favor, aguarde enquanto carregamos a aplicação."/>
        }>

          <Route path={'/'} component={SearchBarView}/>

          <ItemRoutes/>

        </Suspense>
      </Fragment>
    </BrowserRouter>
  )
}

export default Router

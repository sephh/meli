import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Link from 'next/link'
import { withRouter } from 'next/router'

const Breadcrumbs = ({ links }) => {
  return (
    <Fragment>
      {
        links &&
        <div className='breadcrumbs'>
          {
            links.map(l => (
              <div className='breadcrumbs__item' key={l.url}>
                <Link href={_.deburr(l.url)}><a>{l.label}</a></Link>
                <span className="fas fa-chevron-right"/>
              </div>
            ))
          }
        </div>
      }
    </Fragment>
  )
}

Breadcrumbs.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string
  }))
}

export default withRouter(Breadcrumbs)

import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import SearchBarView from '../SearchBarView'
import { withTestRouter } from '../../__mock__/next-test-router'

import Router from 'next/router'

const mockedRouter = {
  push: () => {
  }, prefetch: () => {
  }
}
Router.router = mockedRouter

const searchBarView = () => withTestRouter(<SearchBarView/>, {
  route: '/items',
  pathname: '/items',
  query: { search: 'computador' },
  asPath: '/items'
})

describe('SearchBarView', () => {
  test('should search and navigate to search result', async () => {
    const { container, getByPlaceholderText, getByTestId } = render(searchBarView())

    const searchInput = getByPlaceholderText('Nunca dejes de buscar')
    fireEvent.change(searchInput, { target: { value: 'computador' } })

    // wait delayed input
    await wait(undefined, { timeout: 0 })

    fireEvent.submit(getByTestId('form'))

    expect(container).toBeInTheDocument()
  })
})

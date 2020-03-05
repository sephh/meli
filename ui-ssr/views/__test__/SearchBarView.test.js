import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import SearchBarView from '../SearchBarView'

const searchResultText = 'Search Result'

const SearchResultComponent = () => <div>{searchResultText}</div>

const renderWithRouter = (ui) => {
  return {
    ...render(
      <MemoryRouter initialEntries={['/', '/items']} initialIndex={0}>
        <Route path={'/'} component={ui}/>
        <Route path={'/items'} component={SearchResultComponent}/>
      </MemoryRouter>
    )
  }
}

describe('SearchBarView', () => {
  test('should search and navigate to search result', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter(SearchBarView)

    const searchInput = getByPlaceholderText('Nunca dejes de buscar')
    fireEvent.change(searchInput, { target: { value: 'computador' } })

    // wait delayed input
    await wait(undefined, { timeout: 0 })

    fireEvent.submit(getByTestId('form'))

    expect(getByText(searchResultText)).toBeInTheDocument()
  })
})

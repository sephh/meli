import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import SearchBar from '../SearchBar'

describe('SearchBar', () => {
  test('should render logo', () => {
    const { getByAltText } = render(<SearchBar/>)

    const logo = getByAltText('Logomarca')

    expect(logo).toBeInTheDocument()
  })

  test('should render search input', () => {
    const { getByPlaceholderText } = render(<SearchBar/>)

    const searchInput = getByPlaceholderText('Nunca dejes de buscar')

    expect(searchInput).toBeInTheDocument()
  })

  test('should render search button', () => {
    const { getByAltText } = render(<SearchBar/>)

    const searchButton = getByAltText('Search Icon')

    expect(searchButton).toBeInTheDocument()
  })

  test('should emit change', async () => {
    const mockOnChange = jest.fn(v => v)
    const inputValue = 'any thing'

    const { getByTestId } = render(<SearchBar value={inputValue} onChange={mockOnChange}/>)

    fireEvent.submit(getByTestId('form'))

    expect(mockOnChange).toBeCalledWith(inputValue)
    expect(mockOnChange).toBeCalledTimes(1)
    expect(mockOnChange.mock.results[0].value).toBe(inputValue)
  })

  test('should not emit change', async () => {
    const mockOnChange = jest.fn(v => v)
    const inputValue = ''

    const { getByTestId } = render(<SearchBar value={inputValue} onChange={mockOnChange}/>)

    fireEvent.submit(getByTestId('form'))

    expect(mockOnChange).not.toBeCalled()
  })
})

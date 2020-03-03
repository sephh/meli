import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import SearchBarButton from '../SearchBarButton'

describe('SearchBarButton', () => {
  test('should emit onClick', () => {
    const mockOnClick = jest.fn()

    const {getByAltText} = render(<SearchBarButton onClick={mockOnClick}/>)

    fireEvent.click(getByAltText('Search Icon'))
    fireEvent.click(getByAltText('Search Icon'))

    expect(mockOnClick).toBeCalledTimes(2)
  })
})

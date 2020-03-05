import React from 'react'
import { render } from '@testing-library/react'

import ItemNotFound from '../ItemNotFound'

describe('ItemNotFound', () => {
  test('should render', () => {
    const { getByTestId, getByText } = render(<ItemNotFound/>)

    const icon = getByTestId('warningIcon')
    const message = getByText('Parece que esta página no existe')
    const link = getByText('Ir a casa')

    expect(icon).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })
})

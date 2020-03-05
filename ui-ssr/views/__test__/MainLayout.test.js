import React from 'react'
import { render } from '@testing-library/react'
import MainLayout from '../MainLayout'

describe('MainLayout', () => {
  test('should render', () => {
    const {container} = render(<MainLayout/>)
    expect(container).toBeInTheDocument();
  })
})

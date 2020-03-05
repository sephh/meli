import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs'

const mockLinks = [
  {
    url: '/first/url',
    label: 'First url'
  },
  {
    url: '/second/url',
    label: 'Second url'
  }
]
describe('Breadcumbs', () => {
  test('should render', () => {
    const { getByText } = render(<Breadcrumbs links={mockLinks}/>, { wrapper: MemoryRouter })
    mockLinks.forEach((link)=>{
      const linkElement = getByText(link.label)
      expect(linkElement).toBeInTheDocument()
    })
  })
})

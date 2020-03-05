import React from 'react'
import { render } from '@testing-library/react'
import '../../styles/fontawesome'
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
    const { getByText } = render(<Breadcrumbs links={mockLinks}/>)
    mockLinks.forEach((link)=>{
      const linkElement = getByText(link.label)
      expect(linkElement).toBeInTheDocument()
    })
  })
})

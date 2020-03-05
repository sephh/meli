import React from 'react'
import { render } from '@testing-library/react'
import Loading from '../Loading'

describe('Loading', () => {
  test('should render',()=>{
    const {getByText} = render(<Loading message={'loading'}/>)
    const loadingEl = getByText('loading')

    expect(loadingEl).toBeInTheDocument()
  })
})

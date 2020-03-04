import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import DelayedInput from '../DelayedInput'
import { wait } from '@testing-library/dom'


describe('DelayedInput', () => {
  test('should emit value', async () => {
    const mockOnChange = jest.fn(v => v)
    const delay = 0

    const { getByPlaceholderText } = render(<DelayedInput placeholder={'placeholder'} delay={delay}
                                                          onChange={mockOnChange}/>)

    const inputEl = getByPlaceholderText('placeholder')

    fireEvent.change(inputEl, { target: { value: 'a' } })

    await wait(undefined, { timeout: delay })

    expect(mockOnChange).toBeCalledTimes(1)
    expect(mockOnChange).toBeCalledWith('a')
  })
})

import React from 'react'

import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Login from './Login'

const values = {
    email: 'email@gmail.com',
    password: '123',
}

describe('Login form', () => {
    test('errors when email is invalid', () => {})
    test('errors when password is invalid', () => {})
    test('errors when login is incorrect', () => {})

    test('', async () => {
        const onSubmit = jest.fn()
        const { getByRole, getByLabelText, asFragment } = render(<Login onSubmit={onSubmit} />)
        fireEvent.change(getByLabelText('Email'), { target: { value: values.email }})
        fireEvent.click(getByRole('button'))
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalled()
        })
    })
})

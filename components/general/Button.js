import React from 'react'

import ThemeProvider from '../providers/ThemeProvider'

import styled from 'styled-components'
import { darken } from 'polished'
import { palette } from "styled-tools";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
    display: flex;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 1rem;
    color: white;
    background: ${props => props.theme.palette.primary};
    border: 0px;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    padding: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: 0 .9375px .75px rgba(0, 0, 0, 0.02),
        0 1.875px 1.5px rgba(0, 0, 0, 0.028), 
        0 3.75px 3px rgba(0, 0, 0, 0.035),
        0 7.5px 6px rgba(0, 0, 0, 0.042), 
        0 15px 12px rgba(0, 0, 0, 0.05),
        0 30px 24px rgba(0, 0, 0, 0.07);
    cursor: pointer;
    height: 55px;

    &:hover {
        color: white;
        background-color: ${props => darken(0.05, palette('primary')(props)) };
        box-shadow: 0 .9375px .75px rgba(0, 0, 0, 0.04),
        0 1.875px 1.5px rgba(0, 0, 0, 0.06), 
        0 3.75px 3px rgba(0, 0, 0, 0.07),
        0 7.5px 6px rgba(0, 0, 0, 0.08), 
        0 15px 12px rgba(0, 0, 0, 0.1),
        0 30px 24px rgba(0, 0, 0, 0.14);
    }

    &:focus {
        outline: transparent;
    }

    &:active {
        transform: translateY(2px); 
    }
`

const _Button = ({
    label, 
    isSubmitting, 
    onClick,
    ...props
}) => (
    <ThemeProvider>
        <Button
            {...{ onClick }}
            {...props}
        >
            {isSubmitting 
                ?
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                    />
                :
                    label
            }
        </Button>
    </ThemeProvider>
)

export default _Button

import React from 'react'
import { Spinner, Stack } from 'react-bootstrap'

export default function Chargement() {
    return (
        <Stack style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner animation='border' variant='primary'>
            </Spinner>
        </Stack>
    )
}

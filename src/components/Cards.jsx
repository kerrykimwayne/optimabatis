import { Handyman } from '@mui/icons-material'
import { Stack } from '@mui/material'
import React from 'react'

export default function Cards({ icon, label, number, color }) {
    return (
        <Stack style={{
            width: '80%', borderRadius: '5px', boxShadow: 'rgba(0,0,0,0.16) 0 1px 4px', backgroundColor: color, flexDirection: 'row', padding: '10px',
            justifyContent: 'center', alignItems: 'center', gap: '20px'
        }} >
            <Stack color={'white'}>
                {icon}
            </Stack>
            <Stack color={'white'} width={'70%'} flexDirection={'column'}  >
                <Stack fontWeight={'bold'}>
                    {number}
                </Stack>
                <Stack>
                    {label}
                </Stack>
            </Stack>
        </Stack>
    )
}

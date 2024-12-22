import { Stack } from '@mui/material'
import React from 'react'
import Headers from './Headers'
import { Style } from '../const/Style'
import Cards from './Cards'
import { Cancel, CheckCircle, Handyman, HourglassTop } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import Axioss from '../config/api'
import { Spinner } from 'react-bootstrap'

export default function GeneraleView({ children }) {
    const { data: datarequest, error: errorrequest, refetch: refrequest, isLoading: loadrequest, isError: iserrrequest } = useQuery({
        queryKey: ['request'],
        queryFn: () => Axioss.get(`immobilierpannehelper/intervention/`).then(response => response.data)
    })
    if (errorrequest) {
        refrequest()
    }
    return (
        <Stack sx={{ width: '100%', height: '100%', flexDirection: 'row', backgroundColor: Style.backGroundDark }} >
            <Headers />
            <Stack style={{ width: '100%', height: '97%', backgroundColor: 'white', borderRadius: '10px', flexDirection: 'row' }}>
                <Stack style={{ width: '100%', height: '100%', padding: '15px', gap: '15px' }} >
                    {children}
                </Stack>
            </Stack>
        </Stack>
    )
}

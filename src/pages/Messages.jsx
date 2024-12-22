import React, { useEffect, useState } from 'react'
import GeneraleView from '../components/GeneraleView'
import { Avatar, Button, colors, IconButton, Stack, Typography } from '@mui/material'
import Chargement from '../components/Chargement'
import { AccountBox, Delete } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import Pagin from '../components/const/Pagin'
import Axioss from '../config/api'
import { Modal, Table } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Messages() {
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [idDelete, setIdDelete] = useState(null)
    const users = useSelector(state => state.userinfo)
    const [reducedata, setReduceData] = useState([])
    const navigator = useNavigate()
    const paginatedDataFetch = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const response = await Axioss.get(`immobilierpannehelper/discussion/`)
        return response.data
    }
    const { data: mes, error: errormes, refetch: refetchMes, isLoading: isloadmes, isError: isErrormes } = useQuery({
        queryKey: ['message', page],
        queryFn: paginatedDataFetch,
    })
    if (errormes) {
        refetchMes()
    }
    const handleShow = () => {
        setShow(true)
    }
    const handleHide = () => {
        setShow(false)
    }

    const convertdate = (dateString) => {
        const [datepart, timePart] = dateString.split(' ')
        const [day, month, year] = datepart.split('/').map(Number)
        const [houre, minute] = timePart.split(':').map(Number)
        return new Date(year, month - 1, day, houre, minute)
    }

    const readMessage = (message) => {
        const formData = new FormData()
        formData.append("is_read", true)
        Axioss.patch(`immobilierpannehelper/discussion/${message.createur_info.id}/`, formData).then(response => {
            navigator(`/message/${message.createur_info.id}`, { state: { user: message } })
        }).catch(err => err.message)
    }


    useEffect(() => {
        const red = () => {
            const redx = mes ? mes.reduce((objet, index) => {
                const indess = objet.findIndex(res => (res.sender == index.sender && res.receiver == index.receiver) || (res.receiver == index.sender && res.sender == index.receiver))
                if (indess !== -1) {
                    const compare1 = convertdate(index.created_at)
                    const compare2 = convertdate(objet[indess].created_at)
                    if (compare1 > compare2) {
                        objet[indess] = index
                    }

                }
                else {
                    objet.push(index)
                }
                return objet
            }, []) : []
            setReduceData(redx)
        }
        red()
    }, [mes])
    console.log(reducedata)
    return (
        <GeneraleView>

            <Typography variant='h4'>Listes des Messages </Typography>
            <Stack style={{ width: '100%', height: '100%', borderRadius: '10px', position: 'relative' }}>
                {isloadmes && <Chargement />}
                {reducedata && reducedata.map((user) => (
                    <Stack key={user.id} style={{ marginBottom: '20px' }} onClick={() => readMessage(user)}>
                        <Stack style={{
                            boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', borderRadius: '25px', padding: '10px', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '5px'
                        }}>
                            {user.createur_info.photo ? <Avatar src={user.createur_info.photo} sizes='50px' /> : <Avatar sizes='50px' style={{ backgroundColor: colors.indigo['A200'] }}></Avatar>}
                            {user.content && !user.image && <Typography fontWeight={!user.is_read && 'bold'}>{user.content}</Typography>}
                            {user.content && user.image && <Typography fontWeight={!user.is_read && 'bold'}>{user.content} (image joint)</Typography>}
                            {!user.content && user.image && <Typography fontWeight={!user.is_read && 'bold'}> (image joint)</Typography>}
                        </Stack>

                    </Stack>
                ))}
            </Stack>
        </GeneraleView>
    )
}

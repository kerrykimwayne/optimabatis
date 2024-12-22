import React, { useState } from 'react'
import GeneraleView from '../components/GeneraleView'
import AnnoceForm from '../components/const/AnnoceForm'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import Axioss from '../config/api'
import { useQuery } from '@tanstack/react-query'
import Pagin from '../components/const/Pagin'
import Chargement from '../components/Chargement'
import { Image, Modal } from 'react-bootstrap'
import { Delete } from '@mui/icons-material'
import toast from 'react-hot-toast'

export default function Publiciter() {
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [idDelete, setIdDelete] = useState(null)
    const deleting = (id) => {
        setIdDelete(id)
        setShow(true)
    }
    const getpuall = async ({ queryKey }) => {
        const [_key, page] = queryKey
        const request = await Axioss.get(`immobilierpannehelper/pubalistretriev/?page=${page}`)
        return request.data

    }
    const { data: datapub, error: errorpub, refetch: refetchpub, isLoading: loadpub, isError: isErrPub } = useQuery({
        queryKey: ['puball', page],
        queryFn: getpuall,
        keepPreviousData: true

    })
    if (errorpub) {
        console.log(errorpub.message)
        refetchpub()
    }
    const handleHide = () => {
        setShow(false)
    }
    const handeDelete = () => {
        Axioss.delete(`immobilierpannehelper/puball/${idDelete}/`).then(response => {
            toast.success('Pub supprimer', { duration: 2000 })
            handleHide()
        }).catch((error) => {
            toast.error(error.message, { duration: 2000 })
        })
    }
    console.log(datapub)

    const totalPages = datapub ? Math.ceil(datapub.count / 2) : 1
    return (
        <GeneraleView>
            <Modal show={show} onHide={handleHide}>
                <Modal.Header>
                    <Modal.Title>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Etes vous sur de vouloir supprimer cette Pub ?
                    <Stack flexDirection={'row'} gap={'15px'}>
                        <Button variant='contained' style={{ backgroundColor: 'indigo' }} onClick={() => setShow(false)}>annuler</Button>
                        <Button variant='contained' style={{ backgroundColor: 'red' }} onClick={handeDelete}>Confirmer</Button>
                    </Stack>
                </Modal.Body>
            </Modal>
            <Stack style={{ width: '100%', height: '35%', borderRadius: '10px' }} className='bg-info' justifyContent={'space-between'}
                alignItems={'center'} flexDirection={'row'}>
                <Stack style={{ gap: '10px', padding: '10px', height: '100%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Créez une annonces</Typography>
                    <AnnoceForm label={'Créez une annonce'} />
                </Stack>
            </Stack>
            <Stack style={{ width: '100%', height: '63%', borderRadius: '10px' }} className='bg-tertiary' alignItems={'center'} flexDirection={'row'} gap={'10px'} >
                {loadpub && <Chargement />}
                {datapub && datapub.results.map((item, keys) => (
                    <Stack key={keys} style={{ width: '200px', height: '160px', borderRadius: '10px', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack style={{ width: '100%', height: '80%', backgroundColor: 'gray' }}>
                            <Image src={item.image} thumbnail />
                        </Stack>
                        <IconButton style={{ color: 'red', width: '20px' }} onClick={() => deleting(item.id)}><Delete color='red' /></IconButton>
                    </Stack>
                ))}
            </Stack>
            {datapub && <Pagin data={datapub} setPage={setPage} page={page} totalPages={totalPages} />}

        </GeneraleView>
    )
}

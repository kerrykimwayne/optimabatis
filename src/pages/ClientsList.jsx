import React, { useState } from 'react'
import GeneraleView from '../components/GeneraleView'
import { Avatar, Button, IconButton, Stack, Typography } from '@mui/material'
import Chargement from '../components/Chargement'
import { AccountBox, Delete } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import Pagin from '../components/const/Pagin'
import Axioss from '../config/api'
import { Modal, Table } from 'react-bootstrap'
import toast from 'react-hot-toast'

export default function ClientsList() {
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)
    const [idDelete, setIdDelete] = useState(null)
    const deleting = (id) => {
        setIdDelete(id)
        setShow(true)
    }
    const paginatedDataFetch = async ({ queryKey }) => {
        const [_key, page] = queryKey;
        const response = await Axioss.get(`immobilierpannehelper/usermodif/?page=${page}`)
        return response.data
    }
    const { data: client, error: errorCliet, refetch: refetchClient, isLoading: isloadCli, isError: isErrorCli } = useQuery({
        queryKey: ['cliens', page],
        queryFn: paginatedDataFetch,
        keepPreviousData: true
    })
    if (errorCliet) {
        refetchClient()
    }
    const handleShow = () => {
        setShow(true)
    }
    const handleHide = () => {
        setShow(false)
    }
    const handeDelete = () => {
        Axioss.delete(`immobilierpannehelper/usermodif/${idDelete}/`).then(response => {
            toast.success('utilisateur supprimer', { duration: 2000 })
            handleHide()
        }).catch((error) => {
            toast.error(error.message, { duration: 2000 })
        })
    }
    const totalPages = client ? Math.ceil(client.count / 7) : 1
    return (
        <GeneraleView>
            <Modal show={show} onHide={handleHide}>
                <Modal.Header>
                    <Modal.Title>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Etes vous sur de vouloir supprimer cet utilisateur ?
                    <Stack flexDirection={'row'} gap={'15px'}>
                        <Button variant='contained' style={{ backgroundColor: 'indigo' }} onClick={() => setShow(false)}>annuler</Button>
                        <Button variant='contained' style={{ backgroundColor: 'red' }} onClick={handeDelete}>Confirmer</Button>
                    </Stack>
                </Modal.Body>
            </Modal>
            <Typography variant='h4'>Liste des clients</Typography>
            <Stack style={{ width: '100%', height: '100%', borderRadius: '10px', position: 'relative' }}>
                {isloadCli && <Chargement />}
                {client && (
                    <Stack style={{ width: '100%' }}>
                        <div className="container-fluid text-center">
                            <div style={{ width: '100%', display: 'flex', marginBottom: '15px' }} className='row'>
                                <div className='col-1' style={{ fontWeight: 'bold' }}>#</div>
                                <div className='col-1' style={{ fontWeight: 'bold' }}>Photo</div>
                                <div className='col-3' style={{ fontWeight: 'bold' }}>Nom d'utilisateur</div>
                                <div className='col-3' style={{ fontWeight: 'bold' }}>Telephone</div>
                                <div className='col-3' style={{ fontWeight: 'bold' }}>Email</div>
                                <div className='col-1' style={{ fontWeight: 'bold' }}>Action</div>
                            </div>
                            {client.results.map((item, id) => (
                                <div key={id} style={{ width: '100%', display: 'flex', marginBottom: '15px', padding: '5px', alignItems: 'center', borderRadius: '10px', border: '1px solid gray' }} className='row'>
                                    <div className='col-1' style={{ color: 'black' }}>{id}</div>
                                    <div className='col-1'>{item.photo ? <Avatar src={item.photo} /> : <Avatar>{<AccountBox />}</Avatar>}</div>
                                    <div className='col-3' style={{ color: 'black' }}>{item.username}</div>
                                    <div className='col-3' style={{ color: 'black' }}>{item.numtelephone}</div>
                                    <div className='col-3' style={{ color: 'black' }}>{item.email}</div>
                                    <div className='col-1'><IconButton onClick={() => deleting(item.id)} className='text-danger'><Delete /></IconButton></div>
                                </div>
                            ))}
                        </div>
                    </Stack>
                )}
                <Stack position={'absolute'} bottom={'10px'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                    {client && <Pagin data={client} setPage={setPage} page={page} totalPages={totalPages} />}
                </Stack>
            </Stack>
        </GeneraleView>
    )
}

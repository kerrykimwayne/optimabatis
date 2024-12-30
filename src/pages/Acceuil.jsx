import React, { useEffect, useState } from 'react'
import Axioss, { logout } from '../config/api'
import { Avatar, Box, Button, IconButton, Stack, TextField, Typography, } from '@mui/material'
import Headers from '../components/Headers'
import { Style } from '../const/Style'
import GeneraleView from '../components/GeneraleView'
import { Modal, Pagination, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import Chargement from '../components/Chargement'
import { AccessTimeFilled, Cancel, ChatBubble, CheckCircle, Edit, Handyman, HourglassTop, People, PictureInPicture, ZoomIn } from '@mui/icons-material'
import AnnoceForm from '../components/const/AnnoceForm'
import Pagin from '../components/const/Pagin'
import RequestView from '../components/const/RequestView'
import { useNavigate } from 'react-router-dom'
import Header1 from '../components/Header1'
import Cards from '../components/Cards'
export default function Acceuil() {
    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [page, setPage] = useState(1)
    const [view, setview] = useState('Créer une annonce')
    const [active, setActive] = useState(0)
    const [datauser, setDataUser] = useState({})
    const [filter, setFilter] = useState("")
    const navigator = useNavigate()
    const paginatedDataFetch = async ({ queryKey }) => {
        const [_key, page, filter] = queryKey;
        const url = filter !== "" ? `immobilierpannehelper/intervention/?page=${page}&actif=${filter}` : `immobilierpannehelper/intervention/?page=${page}`
        const response = await Axioss.get(url)
        return response.data
    }

    const handleShow = () => {
        setShow(true)
    }
    const handleHide = () => {
        setShow(false)
    }
    const annonceClick = () => {
        setview('Créer une annonce')
        handleShow()
    }
    const requestClick = (datas) => {
        setDataUser(prev => ({ ...prev, datas }))
        setview('Intervention')
        handleShow()
    }

    const handleFilters = (filtre, number) => {
        setActive(number)
        setFilter(filtre)
    }

    const { data, error, refetch, isLoading, isError } = useQuery({
        queryKey: ['intervention', page, filter],
        queryFn: paginatedDataFetch,
        keepPreviousData: true
    })
    if (error) {
        refetch()
    }
    const readMessage = (item) => {
        navigator(`/message/${item.createur}`, { state: { user: item } })
    }
    const totalPages = data ? Math.ceil(data.count / 10) : 1
    console.log(data)
    return (
        <GeneraleView>
            <Stack style={{ width: '100%', height: '100%', flexDirection: 'row-reverse', gap: '10px' }}>
                <Stack style={{ width: '20%', height: '100%', gap: '10px' }}>
                    <Cards number={data && data.results.length > 0 ? data.results[0].total : <Chargement />} icon={<Handyman />} label={'Total'} color={'blue'} />
                    <Cards number={data && data.results.length > 0 ? data.results[0].enAttente : <Chargement />} icon={<AccessTimeFilled />} label={'En Attente'} color={'orange'} />
                    <Cards number={data && data.results.length > 0 ? data.results[0].enCour : <Chargement />} icon={<HourglassTop />} label={'En Cour'} color={'yellow'} />
                    <Cards number={data && data.results.length > 0 ? data.results[0].annuler : <Chargement />} icon={<Cancel />} label={'Annuler'} color={'red'} />
                    <Cards number={data && data.results.length > 0 ? data.results[0].terminer : <Chargement />} icon={<Cancel />} label={'Terminer'} color={'green'} />
                </Stack>
                <Stack style={{ width: '80%', height: '100%' }}>

                    <Stack style={{ width: '100%', height: '26%', borderRadius: '10px', backgroundColor: '#1A1A1A' }} justifyContent={'space-between'}
                        alignItems={'center'} flexDirection={'row'}>

                        <Stack style={{ gap: '10px', padding: '10px', height: '100%' }}>
                            <Typography variant='h4' color='#FFFFFF'>Créez facilement vos publicités</Typography>
                            <Box width={'80%'} gap={3}  >
                                <Button variant='contained' style={{ backgroundColor: '#007BFF' }} onClick={annonceClick}>Créez une Publicité </Button>
                            </Box>
                        </Stack>
                        <Stack style={{ width: '175px', height: '100%' }}>
                            <img src="/hand.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Stack>
                    </Stack>
                    <Stack className='bg-light' style={{ width: '100%', height: '70%', borderRadius: '10px' }}>
                        {isLoading && <Chargement />}
                        {data && (
                            <Table striped hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Photo</th>
                                        <th>Nom</th>
                                        <th>Status</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.results.map((item, id) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{item.createur_info.photo ? <Avatar src={item.createur_info.photo} /> : <Avatar>{<People />}</Avatar>}</td>
                                            <td>{item.createur_info.username}</td>
                                            <td>{item.actif}</td>
                                            <td><IconButton onClick={() => requestClick(item)}><ZoomIn /></IconButton></td>
                                            <td><IconButton onClick={() => readMessage(item)}><ChatBubble /></IconButton></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                        <Stack width={'100%'} justifyContent={'center'} alignItems={'center'} position={'relative'} height={'100%'}>
                            <Stack flexDirection={'row'} width={'100%'} justifyContent={'center'} alignItems={'center'} gap={'10px'} position={'absolute'} bottom={0}>
                                <Typography>Filtre</Typography>
                                <IconButton onClick={() => handleFilters("", 0)} style={{ backgroundColor: active === 0 ? 'orange' : 'black', color: 'white' }}><Handyman /></IconButton>
                                <IconButton onClick={() => handleFilters("en attente", 1)} style={{ backgroundColor: active === 1 ? 'orange' : 'black', color: 'white' }}><AccessTimeFilled /></IconButton>
                                <IconButton onClick={() => handleFilters("terminer", 2)} style={{ backgroundColor: active === 2 ? 'orange' : 'black', color: 'white' }}><CheckCircle /></IconButton>
                                <IconButton onClick={() => handleFilters("en cour", 3)} style={{ backgroundColor: active === 3 ? 'orange' : 'black', color: 'white' }}><HourglassTop /></IconButton>
                                <IconButton onClick={() => handleFilters("annuler", 4)} style={{ backgroundColor: active === 4 ? 'orange' : 'black', color: 'white' }}><Cancel /></IconButton>
                            </Stack>
                        </Stack>
                        {data && <Pagin data={data} setPage={setPage} page={page} totalPages={totalPages} />}
                    </Stack>
                    <Modal show={show} onHide={handleHide}>
                        <Modal.Header>
                            <Modal.Title>
                                {view}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {view === 'Créer une annonce' && <AnnoceForm handleHide={handleHide} show={show} label={'Créez une annonce'} />}
                            {view === 'Intervention' && <RequestView handleHide={handleHide} show={show} user={datauser} />}
                        </Modal.Body>
                    </Modal>
                </Stack>
            </Stack>
        </GeneraleView>

    )
}

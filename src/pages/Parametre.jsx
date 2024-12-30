import React, { useEffect, useState } from 'react'
import GeneraleView from '../components/GeneraleView'
import { Avatar, Badge, Box, Button, colors, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Chargement from '../components/Chargement'
import { AccountBox, AlternateEmail, Call, Camera, Delete, Person } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import Axioss from '../config/api'
import toast from 'react-hot-toast'
import { setuser } from '../config/redux'
import Pagin from '../components/const/Pagin'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function Parametre({ children }) {

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
        queryKey: ['cliensAdmin', page],
        queryFn: paginatedDataFetch,
        keepPreviousData: true
    })
    const queryclient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id) => Axioss.delete(`immobilierpannehelper/usermodif/${id}/`).then(response => {
        }).catch((error) => {
            toast.error(error.message, { duration: 2000 })
        }),
        onSuccess: () => {
            toast.success('utilisateur supprimer', { duration: 2000 })
            queryclient.invalidateQueries('cliensAdmin')
            reset()
        }
    })
    if (errorCliet) {
        refetchClient()
    }
    const handeDelete = (id) => {
        mutation.mutate(id)
    }
    const totalPages = client ? Math.ceil(client.count / 10) : 1

    const [load, setLoad] = useState(false)
    const user = useSelector(state => state.userinfo)
    const [active, setActive] = useState('profile')
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const submitting = async (data) => {
        setLoad(true)
        const firstname = await user.username.split(" ")[0]
        const lastname = await user.username.split(" ")[1]
        const formData = new FormData()
        formData.append('first_name', data.first_name == "" ? firstname : data.first_name)
        formData.append('last_name', data.last_name == "" ? lastname : data.last_name)
        formData.append('numtelephone', data.numtelephone == "" ? user.numtelephone : data.numtelephone)
        formData.append('email', data.email == "" ? user.email : data.email)
        formData.append('username', data.first_name + data.last_name)
        if (image) {
            formData.append('photo', image || user.photo)
        }

        Axioss.put(`immobilierpannehelper/usermodif/${user.id}/`, formData).then(response => {

            toast.success('information mise à jour', { duration: 2000 })
            dispatch(setuser({ ...response.data }))
            setLoad(false)

        }).catch(errors => {
            toast.error(errors.message, { duration: 2000 })
            setLoad(false)
        })
    }
    const passwordsubmitting = async (data) => {
        setLoad(true)
        const formData = new FormData()
        formData.append('new_password', data.password)
        formData.append('password', data.password)
        Axioss.patch(`immobilierpannehelper/passwordchange/`, formData).then(response => {
            toast.success('information mise à jour', { duration: 2000 })
            setLoad(false)
        }).catch(errors => {
            toast.error(errors.message, { duration: 2000 })
            setLoad(false)
        })
    }
    const newusers = async (data) => {
        setLoad(true)
        const formData = new FormData()
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('password', data.password)
        Axioss.post(`immobilierpannehelper/usercreate/`, formData).then(response => {
            toast.success('Utilisateur créer', { duration: 2000 })
            setLoad(false)
        }).catch(errors => {
            toast.error(errors.message, { duration: 2000 })
            setLoad(false)
        })
    }
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    useEffect(() => {
        reset()
    }, [user])
    return (
        <GeneraleView>
            <Stack style={{ width: '100%', height: '100%', position: 'relative', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack style={{ gap: '10px' }}>
                    <Stack style={{
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px', cursor: 'pointer',
                        backgroundColor: active === 'profile' ? 'indigo' : 'white', color: active === 'profile' ? 'white' : 'black'
                    }} onClick={() => setActive('profile')}>Parametre de Profile</Stack>
                    <Stack style={{
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px', cursor: 'pointer',
                        backgroundColor: active === 'password' ? 'indigo' : 'white', color: active === 'password' ? 'white' : 'black'
                    }} onClick={() => setActive('password')}>Mot de passe et Sécurité</Stack>

                    <Stack style={{
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px', cursor: 'pointer',
                        backgroundColor: active === 'newuser' ? 'indigo' : 'white', color: active === 'newuser' ? 'white' : 'black'
                    }} onClick={() => setActive('newuser')}>Nouvel Utilisateur</Stack>
                </Stack>
                {active === 'profile' && <Stack style={{ gap: '10px', width: '68%' }}>
                    {user && <Stack style={{
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px', borderRadius: '5px',
                        flexDirection: 'row',
                        gap: '7px', alignItems: 'center'
                    }}>
                        {user.photo ? <Avatar src={user.photo} sizes='50px' /> : <Avatar sizes='50px' style={{ backgroundColor: colors.indigo['A200'] }}></Avatar>}
                        <Stack>
                            <Typography fontWeight={'bold'}>{user.username}</Typography>
                            {user.email ? <Typography >{user.username}</Typography> : <Typography>pas d'email</Typography>}
                            <Typography>{user.numtelephone}</Typography>
                        </Stack>

                    </Stack>}
                    <Stack style={{
                        boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <Typography>Mettre à jour mes informations</Typography>
                        <form onSubmit={handleSubmit(submitting)}>
                            <Box gap={3} sx={{ width: { sx: '90%', sm: '80%' }, marginBottom: '10px' }}>
                                <div className="row">
                                    <div className="col-5">
                                        <TextField label="nom" fullWidth margin='dense' size='small' name='first_name' style={{ marginBottom: '10px' }}
                                            {...register('first_name', { minLength: { value: 3 }, })} error={errors.first_name} helperText={errors.first_name && "identifiant incorrect"}
                                        />
                                    </div>
                                    <div className="col-2"></div>
                                    <div className="col-5">
                                        <TextField label="prenom" fullWidth margin='dense' size='small' name='last_name' style={{ marginBottom: '10px' }}
                                            {...register('last_name', { minLength: { value: 3 }, })} error={errors.last_name} helperText={errors.last_name && "identifiant incorrect"}
                                        />
                                    </div>
                                </div>
                                <TextField label='telephone' fullWidth margin='dense' size='small' name='numtelephone' style={{ marginBottom: '10px' }}
                                    {...register('numtelephone', { minLength: { value: 5 }, })} error={errors.numtelephone} helperText={errors.numtelephone && "identifiant incorrect"}
                                />
                                <TextField label='email' fullWidth margin='dense' size='small' name='email' style={{ marginBottom: '10px' }}
                                    {...register('email', { minLength: { value: 5 }, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'email incorrect' } })} error={errors.email} helperText={errors.email && "email incorrect"}
                                />
                                <input type="file" name="photo" id="" accept='.jpg, .jpeg, .png' className='form-control' onChange={handleImage} />
                            </Box>
                            <Box width={'80%'} gap={3} >
                                <Button type='submit' variant='contained' style={{ backgroundColor: 'indigo' }}>{load ? <Chargement /> : 'mettre à jour'}</Button>
                            </Box>
                        </form>
                    </Stack>
                </Stack>}
                {active === 'password' && <Stack style={{
                    boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px',
                    borderRadius: '5px', width: '68%'
                }}>
                    <Typography>Mettre à jour mon mot de passe</Typography>
                    <form onSubmit={handleSubmit(passwordsubmitting)}>
                        <Box gap={3} sx={{ width: { sx: '90%', sm: '80%' }, marginBottom: '10px' }}>
                            <TextField label='ancien mot de passe' fullWidth margin='dense' size='small' name='password' style={{ marginBottom: '10px' }}
                                {...register('password', { minLength: { value: 5 }, })} error={errors.password} helperText={errors.password && "mot de passe incorrect incorrect"}
                                type='password'
                            />
                            <TextField label='nouveau mot de passe' fullWidth margin='dense' size='small' name='new_password' style={{ marginBottom: '10px' }}
                                {...register('new_password', { minLength: { value: 5 }, })} error={errors.new_password} helperText={errors.new_password && "mot de passe incorrect incorrect"}
                                type='password'
                            />

                        </Box>
                        <Box width={'80%'} gap={3} >
                            <Button type='submit' variant='contained' style={{ backgroundColor: 'indigo' }}>{load ? <Chargement /> : 'mettre à jour'}</Button>
                        </Box>
                    </form>
                </Stack>}
                {active === 'newuser' && <Stack style={{
                    boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.2)', padding: '10px',
                    borderRadius: '5px', width: '68%'
                }}>
                    <Typography>Nouvel Utilisateur</Typography>
                    <form onSubmit={handleSubmit(newusers)}>
                        <Box gap={3} sx={{ width: { sx: '90%', sm: '80%' }, marginBottom: '10px' }}>
                            <TextField label='Nom' fullWidth margin='dense' size='small' name='first_name' style={{ marginBottom: '10px' }}
                                {...register('first_name', { minLength: { value: 5 }, })} error={errors.first_name} helperText={errors.first_name && "le nom est incorrect"}
                            />
                            <TextField label='prenom' fullWidth margin='dense' size='small' name='last_name' style={{ marginBottom: '10px' }}
                                {...register('last_name', { minLength: { value: 5 }, })} error={errors.last_name} helperText={errors.last_name && "prenom incorrect"}
                            />
                            <TextField label='password' fullWidth margin='dense' size='small' name='password' style={{ marginBottom: '10px' }}
                                {...register('password', { minLength: { value: 5 }, })} error={errors.password} helperText={errors.password && "mot de passe incorrect"}
                                type='password'
                            />

                        </Box>
                        <Box width={'80%'} gap={3} >
                            <Button type='submit' variant='contained' style={{ backgroundColor: 'indigo' }}>{load ? <Chargement /> : 'Créez un compte'}</Button>
                        </Box>
                    </form>
                    <Stack style={{ width: '100%', overflow: 'scroll' }}>
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
                                    {client.results.filter(index => index.is_staff == true).map((item, id) => (
                                        <div key={id} style={{ width: '100%', display: 'flex', marginBottom: '15px', padding: '5px', alignItems: 'center', borderRadius: '10px', border: '1px solid gray' }} className='row'>
                                            <div className='col-1' style={{ color: 'black' }}>{id}</div>
                                            <div className='col-1'>{item.photo ? <Avatar src={item.photo} /> : <Avatar>{<AccountBox />}</Avatar>}</div>
                                            <div className='col-3' style={{ color: 'black' }}>{item.username}</div>
                                            <div className='col-3' style={{ color: 'black' }}>{item.numtelephone}</div>
                                            <div className='col-3' style={{ color: 'black' }}>{item.email}</div>
                                            <div className='col-1'><IconButton onClick={() => handeDelete(item.id)} className='text-danger'><Delete /></IconButton></div>
                                        </div>
                                    ))}
                                </div>
                            </Stack>
                        )}
                        <Stack justifyContent={'center'} alignItems={'center'} width={'100%'}>
                            {client && <Pagin data={client} setPage={setPage} page={page} totalPages={totalPages} />}
                        </Stack>
                    </Stack>
                </Stack>}

            </Stack>
        </GeneraleView>
    )
}

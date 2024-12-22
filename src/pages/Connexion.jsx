import { } from '@mui/icons-material'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../config/api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Chargement from '../components/Chargement'
export default function Connexion() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [load, setLoad] = useState(false)
    const submitting = async (data) => {
        setLoad(true)
        const numtelephone = data.numtelephone
        const password = data.password
        await login({ numtelephone, password })
        setLoad(false)
        reset()
    }
    return (
        <>
            <Stack width={'100vw'} height={'100vh'} alignItems={'center'} justifyContent={'center'} flexDirection={'row'}>
                <Stack style={{ width: '50%', height: '100%', backgroundColor: 'indigo', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h3' color='white'>
                        Bienvenue à vous
                    </Typography>
                    <Typography variant='h6' color='white' textAlign={'center'}>
                        Connectez vous pour commencer à gérer vos données en tant qu'administrateur
                    </Typography>
                </Stack>
                <Stack style={{ width: '50%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <form onSubmit={handleSubmit(submitting)}>
                        <h4>Connexion</h4>
                        <Box gap={3} sx={{ width: { sx: '90%', sm: '80%' }, marginBottom: '10px' }}>
                            <TextField label='telephone' fullWidth margin='dense' size='small' name='numtelephone' style={{ marginBottom: '10px' }}
                                {...register('numtelephone', { required: true, minLength: { value: 5 }, })} error={errors.numtelephone} helperText={errors.numtelephone && "identifiant incorrect"}
                            />
                            <TextField label='mot de passe' fullWidth margin='dense' size='small' name='password'{...register('password', { required: true, minLength: { value: 5 }, pattern: { value: /^[A-Za-z0-9@]+$/, message: 'chiffres et lettres uniquement' } })} error={errors.password} helperText={errors.password && "mot de passe incorrect"} type='password' />
                        </Box>
                        <Box width={'80%'} gap={3} >
                            {load ? <Chargement /> : <Button type='submit' variant='contained' style={{ backgroundColor: 'indigo' }}>Se connecter</Button>}
                        </Box>
                    </form>
                </Stack>
            </Stack>
        </>
    )
}

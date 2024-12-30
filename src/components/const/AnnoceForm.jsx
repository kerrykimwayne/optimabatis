import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Axioss from '../../config/api'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Chargement from '../Chargement'

export default function AnnoceForm({ handleHide, show, label }) {
    const { register: annoneregister, handleSubmit: annoncesubmit, formState: { errors: errorsannonce }, reset } = useForm()
    const queryClient = useQueryClient()
    const [load, setLoad] = useState(false)
    const mutation = useMutation({
        mutationFn: (formData) => Axioss.post('https://kerrykimwayne.pythonanywhere.com/immobilierpannehelper/puball/', formData).then((response) => response.data),
        onError: () => {
            toast.error(error.message, { duration: 3000, })
            if (handleHide) {
                handleHide()
            }
        },
        onSuccess: () => {
            setLoad(false)
            reset()
            queryClient.invalidateQueries('intervention')
            toast.success('annonce publier', { duration: 3000, })
            if (handleHide) {
                handleHide()
            }
        }
    })
    const submitting = (data) => {
        setLoad(true)
        const formData = new FormData()
        formData.append("description", data.description)
        formData.append("image", data.image[0])
        mutation.mutate(formData)
    }
    useEffect(() => {
        reset()
    }, [show])
    return (
        <form onSubmit={annoncesubmit(submitting)}>
            <Box gap={3} sx={{ width: { sx: '90%', sm: '80%' }, marginBottom: '10px' }}>
                <TextField label='description' fullWidth margin='dense' size='small' name='description' style={{ marginBottom: '10px' }}
                    {...annoneregister('description', { required: false, minLength: { value: 10, message: 'minimu 10 caracteres' } })} error={errorsannonce.description} helperText={errorsannonce.description && "descrition incorrect"}
                />
                <input accept='image/*' size='small' name='image'{...annoneregister('image', { required: true })} type='file' />
            </Box>
            <Box width={'80%'} gap={3} >
                <Button type='submit' variant='contained' style={{ backgroundColor: '#007BFF' }} >{load ? <Chargement /> : label}</Button>
            </Box>
        </form>
    )
}

import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GeneraleView from '../components/GeneraleView'
import { Avatar, colors, IconButton, Stack, TextField, Typography } from '@mui/material'
import { pink } from '@mui/material/colors'
import Axioss from '../config/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Delete, Done, Send, Upload } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import ReactImageUploading from 'react-images-uploading'
import { Image } from 'react-bootstrap'
import Chargement from '../components/Chargement'
export default function MessageDetail() {
    const { id } = useParams()
    const location = useLocation()
    const [image, setImage] = useState(null)
    const queryClient = useQueryClient()
    const [load, setLoad] = useState(false)
    const mutation = useMutation({
        mutationFn: (formData) => Axioss.post(`immobilierpannehelper/discussion/`, formData).then(response => response.data),
        onError: () => {
            setLoad(false)
            toast.error(erro.message, { duration: 2000 })
        },
        onSuccess: () => {
            setLoad(false)
            reset()
            queryClient.invalidateQueries('messagedetail')
            toast.success('message envoyer', { duration: 2000 })
        }
    })
    const maxNumber = 1
    const { user } = location.state || {}
    const { data: msdetail, error: errormsdetail, refetch: refetchmsdetail, isLoading: isloadmsdetail, isError: isErrormsdetail } = useQuery({
        queryKey: ['messagedetail'],
        queryFn: () => Axioss.get(`immobilierpannehelper/discussion/`).then(response => response.data),
    })
    const users = useSelector(state => state.userinfo)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const submitting = (data) => {
        setLoad(true)
        const formData = new FormData()
        formData.append("receiver", id)
        formData.append("content", data.content)
        if (data.content !== "" || image) {
            if (image) {
                formData.append("image", image.file)
            }
            mutation.mutate(formData)
        }
        else {
            toast.error('tout les champs sont vides', { duration: 2000 })
        }
    }
    if (errormsdetail) {
        refetchmsdetail()
    }
    const onchange = (imagelist) => { setImage(imagelist[0] || null) }
    return (
        <Stack style={{ width: '100vw', height: '100%' }}>
            <Stack style={{ width: '100%', height: '8%', position: 'fixed', zIndex: 90, top: 0 }}>
                <Stack style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: '5px', backgroundColor: colors.deepPurple['A400'], padding: '10px' }}>
                    {user.createur_info.photo ? <Avatar src={user.createur_info.photo} /> : <Avatar sx={{ bgcolor: pink[500] }}></Avatar>}
                    <Typography>{user.createur_info.username}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: '100%', height: '60px' }}></Stack>
            <Stack style={{ width: '100%', height: '78%', overflowY: 'scroll', gap: '15px', margin: '10px' }}>
                {msdetail && msdetail.filter(value => value.receiver == id).map((item, key) => (<Stack key={key}
                    sx={{
                        maxWidth: '80%', alignSelf: item.sender == id ? 'flex-start' : 'flex-end',
                        backgroundColor: item.sender == id ? 'grey' : colors.blue['A100'], padding: '10px',
                        borderRadius: '10px', borderBottomRightRadius: item.sender == id ? '10px' : 0, marginBottom: '15px'
                    }}>
                    {item.content !== "" && item.image == null && <Typography>{item.content}</Typography>}
                    {item.content == "" && item.image !== null && <Stack width={'40%'} height={'40%'}><Image src={item.image} /></Stack>}
                    {item.content !== "" && item.image !== null && <Stack sx={{ maxWidth: '80%' }}>
                        <Stack width={'200px'} height={'200px'}><Image src={item.image} fluid /></Stack>
                        <Typography>{item.content}</Typography>
                    </Stack>}
                </Stack>))}
            </Stack>

            <Stack style={{ width: '100%', position: 'fixed', bottom: '20px', zIndex: 90, backgroundColor: "white" }}>
                <form onSubmit={handleSubmit(submitting)}>
                    <Stack style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                        <TextField fullWidth margin='dense' name='content' style={{ marginBottom: '10px', width: '50%' }}
                            {...register('content', { required: false })} error={errors.content} helperText={errors.content && "descrition incorrect"}
                        />
                        <IconButton type='submit'>{load ? <Chargement /> : <Send />}</IconButton>
                        <ReactImageUploading multiple={false} value={image ? [image] : []} maxNumber={maxNumber} dataURLKey='data_url' onChange={onchange}>
                            {({ imageList, onImageUpdate, onImageRemove }) => <Stack flexDirection={'row'} alignItems={'center'}>
                                <IconButton onClick={onImageUpdate}><Upload /></IconButton>
                                {image && <Stack flexDirection={'row'} alignItems={'center'}>
                                    <Image src={image.data_url} fluid style={{ maxWidth: '80px', maxHeight: '80px' }} />
                                    <IconButton onClick={() => onImageRemove(0)}><Delete /></IconButton>
                                </Stack>}
                            </Stack>}
                        </ReactImageUploading>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

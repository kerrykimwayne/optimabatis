import { AccountBox } from '@mui/icons-material'
import { Avatar, Button, Typography } from '@mui/material'
import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import Chargement from '../Chargement'
import Axioss from '../../config/api'

export default function RequestView({ handleHide, show, user }) {
    const annulerinstance = (id) => {
        Axioss.patch(`immobilierpannehelper/intervention/${id}/`, { "actif": "annuler" }).then(response => {
            handleHide()
        })
    }
    const terminerinstance = (id) => {
        Axioss.patch(`immobilierpannehelper/intervention/${id}/`, { "actif": "terminer" }).then(response => {
            handleHide()
        })
    }
    console.log(user)
    return (
        user ? <Stack style={{ width: '100%', alignItems: 'center', gap: '15px' }}>
            <Stack style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    {user?.datas.createur_info.image ? <Avatar src={user.image} /> : <Avatar><AccountBox /></Avatar>}
                    <Typography variant='h5'>{user.datas.createur_info.username}</Typography>
                </Stack>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h6' color='black' fontWeight={'bold'}>Status : </Typography>
                    <Typography variant='h5' >{user.datas.actif}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h6' color='black' fontWeight={'bold'}>Type de Demande: </Typography>
                </Stack>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h5'>{user.datas.typedemande}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h6' color='black' fontWeight={'bold'}>Service Rechercher: </Typography>
                </Stack>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h5'>{user.datas.service}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h6' color='black' fontWeight={'bold'}>Prévu pour le: </Typography>
                </Stack>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h5'>{user.datas.date} à {user.datas.heure}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h6' color='black' fontWeight={'bold'}>Préférence Contact: </Typography>
                </Stack>
                <Stack style={{ flexDirection: 'row', alignItems: 'center', gap: '5px' }}>
                    <Typography variant='h5'>{user.datas.preferencecontact}</Typography>
                </Stack>
            </Stack>
            <Stack style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' color='black' fontWeight={'bold'}>Description </Typography>
            </Stack>
            <Stack style={{ width: "100%", wordWrap: 'break-word' }}>
                <Typography textAlign={'left'}>{user.datas.description}
                </Typography>
            </Stack>
            <Stack style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' color='black' fontWeight={'bold'}>Images Joints </Typography>
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                {user.datas.image0 && <a href={user.datas.image0} style={{ width: '100px', height: '100px' }}>
                    <Stack style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
                        <Image src={user.datas.image0} fluid />
                    </Stack></a>}
                {user.datas.image1 && <a href={user.datas.image1} style={{ width: '100px', height: '100px' }}>
                    <Stack style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
                        <Image src={user.datas.image1} fluid />
                    </Stack></a>}
                {user.datas.image2 && <a href={user.datas.image2} style={{ width: '100px', height: '100px' }}>
                    <Stack style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}>
                        <Image src={user.datas.image2} fluid />
                    </Stack></a>}
                {!user.datas.image0 && !user.datas.image1 && !user.datas.image2 && <Stack style={{ width: "100%", justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography >pas d'image </Typography>
                </Stack>}
            </Stack>
            <Stack style={{ width: "100%", flexDirection: 'row', gap: '15px', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant='contained' style={{ backgroundColor: 'red' }} onClick={() => annulerinstance(user.datas.id)}>Annuler</Button>
                <Button variant='contained' style={{ backgroundColor: 'green' }} onClick={() => terminerinstance(user.datas.id)}>Terminer</Button>
            </Stack>
        </Stack> : <Chargement />
    )
}

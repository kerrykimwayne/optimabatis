import { Button, Stack } from '@mui/material'
import React from 'react'
import { Style } from '../const/Style'
import { NavLink } from 'react-router-dom'
import Acceuil from '../pages/Acceuil'
import { AccountCircle, Campaign, ChatBubble, Home, People, Settings } from '@mui/icons-material'
import MenuNav from './MenuNav'
import { logout } from '../config/api'

export default function Headers() {
    return (
        <Stack style={{ height: '100%', width: '20%', backgroundColor: Style.backGroundDark }}>
            <Stack width={'100%'} height={'100%'} >
                <MenuNav icon={<Home />} label={'Acceuil'} view={'/acceuil'} />
                <MenuNav icon={<People />} label={'Liste Clients'} view={'/clientlist'} />
                <MenuNav icon={<ChatBubble />} label={'Messages'} view={'/message'} />
                <MenuNav icon={<Campaign />} label={'Publicitées'} view={'/publiciter'} />
                <MenuNav icon={<Settings />} label={'Parametre'} view={'/parametre'} />
                <Button onClick={logout}>Se Déconnecter</Button>
            </Stack>
        </Stack>
    )
}

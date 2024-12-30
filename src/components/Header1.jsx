import { Avatar, Box, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Style } from '../const/Style'
import { useSelector } from 'react-redux'
import { deepOrange } from '@mui/material/colors'
import { Image } from 'react-bootstrap'
import { Search } from '@mui/icons-material'

export default function Header1() {
    const user = useSelector(state => state.userinfo)
    const [avt, setAvt] = useState('')
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (user?.username) {
            setAvt(user.username)
        }
        else {
            setAvt('A')
        }
    }, [user])
    return (
        <Stack style={{ width: '100vw', height: '50px', backgroundColor: Style.backGroundDark, padding: '10px', paddingLeft: '25px' }}
            flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack width={'40px'} height={'40px'} style={{ backgroundColor: 'white', borderRadius: '50px', justifyContent: 'center', alignItems: 'center' }}>
                <Image src='/logo2.png' style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
            </Stack>
            <Stack>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='recherche'
                    variant='outlined'
                    size='small'
                    sx={{ backgroundColor: 'white', borderRadius: '10px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={'20px'} paddingRight={'10px'}>
                <Box>
                    {user && <Typography variant='h6' color='yellow'>{user.username}</Typography>}
                </Box>
                <Box>
                    {user.photo ? <Avatar src={user.photo} /> : <Avatar sx={{ bgcolor: deepOrange[400] }}>{avt[0]}</Avatar>}
                </Box>
            </Stack>
        </Stack>
    )
}

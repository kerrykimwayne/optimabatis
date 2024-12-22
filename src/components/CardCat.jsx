import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

export default function CardCat({ data }) {

    return (
        <Stack sx={{ position: 'relative', justifyContent: 'center', alignItems: 'center', width: { xs: '90%', sm: '150px' }, height: { xs: '100px', sm: '150px' }, cursor: 'pointer' }}>

            {data ? <motion.div key={data.id} initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.5, type: 'tween' }} style={{
                position: 'absolute',
                justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'
            }}>
                <Stack width={'100%'} height={'100%'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Stack width={'100%'} height={'100%'} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <img src={data.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <Stack sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', gap: '10px' }} >
                            <Typography color='white' textAlign={'center'}>{data.label}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </motion.div>
                : <Stack>
                    <Typography>En cour de chargement</Typography>
                    <CircularProgress />
                </Stack>}


        </Stack>
    )
}

import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import { Button, CircularProgress, colors, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Carousel({ data }) {

    const [initialState, setSetate] = useState(0)
    const next = () => {
        setSetate((initialState + 1) % data.length)
    }
    const prev = () => {
        setSetate((initialState - 1 + data.length) % data.length)
    }
    useEffect(() => {
        const nexted = () => {
            setTimeout(() => { next() }, 5000)
            return clearTimeout(nexted)
        }
        nexted()

    }, [initialState])
    return (
        <Stack width={'100%'} height={'100%'} style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
            {data ? data.map((item, id) => {
                return <motion.div key={item.id} initial={{ opacity: 1 }} animate={{ opacity: initialState == id ? 1 : 0 }} transition={{ duration: 0.5, type: 'tween' }} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Stack width={'100%'} height={'100%'} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Stack width={'100%'} height={'100%'} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <Stack sx={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', gap: '10px' }} >
                                <Typography variant='h3' color='white' textAlign={'center'}>{item.nom}</Typography>
                                <Typography variant='h5' color='white' textAlign={'center'} width={'90%'}>{item.description}</Typography>
                                <Typography variant='h5' color='white' textAlign={'center'}>prix: {item.prix} fcfa(promotion)</Typography>
                                <Button variant='contained' style={{ zIndex: 10 }}>Voir l'article</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </motion.div>
            }) : <Stack>
                <Typography>En cour de chargement</Typography>
                <CircularProgress />
            </Stack>}
            <Stack width={'100%'} height={'100%'} style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={prev}><IconButton><ArrowLeft /></IconButton></div>
                <div onClick={next}><IconButton><ArrowRight /></IconButton></div>
            </Stack>
            <Stack width={'100%'} style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center', bottom: '20px', justifyContent: 'center' }}>
                {data.map((item, id) => {
                    return <Stack key={item.id}>
                        <motion.div initial={{ backgroundColor: initialState == id ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.5)' }} animate={{ backgroundColor: initialState == id ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.5)' }}
                            transition={{ duration: 0.5, type: 'tween' }} style={{ width: '10px', height: '10px', borderRadius: '50%', margin: '10px', border: 'solid 1px black' }} onClick={() => setSetate(id)}>
                        </motion.div>
                    </Stack>
                })}
            </Stack>

        </Stack>
    )
}

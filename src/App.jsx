import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Connexion from './pages/Connexion'
import { dataFesh, store } from './config/redux'
import { useSelector } from 'react-redux'
import Acceuil from './pages/Acceuil'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import Header1 from './components/Header1'
import { Stack } from '@mui/material'
import ClientsList from './pages/ClientsList'
import Messages from './pages/Messages'
import Publiciter from './pages/Publiciter'
import Parametre from './pages/Parametre'
import Users from './pages/Users'
import { Password } from '@mui/icons-material'
import Passwords from './pages/Passwords'
import MessageDetail from './pages/MessageDetail'

export default function App() {
  const token = useSelector(state => state.token)
  const navigation = useNavigate()
  useEffect(() => {
    store.dispatch(dataFesh())
    if (token) {
      navigation('/acceuil', { replace: true })
    }
    else {
      navigation('/connexion', { replace: true })
    }
  }, [token])
  const location = useLocation()
  return (
    <Stack style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0 }}>
      <Toaster />
      {token && <Header1 />}
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          {!token && <>
            <Route path='/connexion' element={<Connexion />} />
          </>}
          {token && <>
            <Route path='/acceuil' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Acceuil />
              </motion.div>
            } />
            <Route path='/clientlist' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <ClientsList />
              </motion.div>
            } />
            <Route path='/message' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Messages />
              </motion.div>
            } />
            <Route path='/publiciter' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Publiciter />
              </motion.div>
            } />
            <Route path='/parametre' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Parametre />
              </motion.div>
            } />
            <Route path='/updateprofile' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Users />
              </motion.div>
            } />
            <Route path='/updatepassword' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <Passwords />
              </motion.div>
            } />
            <Route path='/message/:id' element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} style={{ width: '100vw', height: '100vh' }}>
                <MessageDetail />
              </motion.div>
            } />
          </>}
        </Routes>
      </AnimatePresence>
    </Stack>
  )
}

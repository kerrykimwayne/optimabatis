import { configureStore, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { useState } from "react";
export const dataFesh = () => async (dispatch) => {
    const token = await Cookies.get('token')
    const users = await Cookies.get('userinfo')
    if (token) {
        dispatch(settoken(token))
        if (users) {
            const datauser = JSON.parse(users)
            dispatch(setuser(datauser))
        }

    }
}

const tokendata = createSlice({
    name: 'token',
    initialState: Cookies.get('token') === undefined ? null : Cookies.get('token'),
    reducers: {
        gettoken: (state, action) => {
            return state
        },
        settoken: (state, action) => {
            Cookies.set('token', action.payload, { expires: 7 })
            return action.payload
        },
        deletetoken: (state, action) => {
            Cookies.remove('token')

            return null
        },
    }
})


const userInfo = createSlice({
    name: 'userinfo',
    initialState: {},
    reducers: {
        getuser: (state, action) => {
            const token = Cookies.get('userinfo')
            return JSON.parse(token)
        },
        setuser: (state, action) => {
            const token = JSON.stringify(action.payload)
            Cookies.set('userinfo', token, { expires: 7 })
            return action.payload
        },
        deleteuser: (state, action) => {
            Cookies.remove('userinfo')
            return null
        },
    }
})



export const { gettoken, settoken, deletetoken } = tokendata.actions
export const { getuser, setuser, deleteuser } = userInfo.actions
export const store = configureStore({
    reducer: {
        token: tokendata.reducer,
        userinfo: userInfo.reducer,
    }
})
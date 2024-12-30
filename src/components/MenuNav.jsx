import React from 'react'
import { NavLink } from 'react-router-dom'
import { Style } from '../const/Style'

export default function MenuNav({ view, icon, label }) {
    return (
        <NavLink title={label} end to={view} style={({ isActive }) => ({
            backgroundColor: isActive ? '#007BFF' : 'transparent',
            padding: '10px', margin: '20px',
            alignItems: 'center', color: isActive ? Style.backGroundDark : 'white', borderRadius: '5px'
        })}>{icon} {label}</NavLink>
    )
}

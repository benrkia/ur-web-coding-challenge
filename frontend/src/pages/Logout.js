import React from 'react'
import { Redirect } from 'react-router-dom';
import { userService } from '../services/user.service'

export default function Logout() {

    userService.logout();
    
    return (
        <Redirect to={{ pathname: '/login' }} />
    )
}

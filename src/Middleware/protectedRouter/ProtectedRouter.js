import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
const ProtectedRouter = () => {
    const token = localStorage.getItem("flip-token-ad");

    return token ? <Outlet /> : <Navigate to="/" />
}
export default ProtectedRouter

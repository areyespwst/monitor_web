import React from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Navigate to="/login" replace />
        </>
    )
}

export default Home
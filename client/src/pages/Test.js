import { useState, useEffect } from 'react'
import axios from 'axios'

function Test() {

    const API_URL = 'http://localhost:5005';

    useEffect(() => {
        const queryString = window.location.search
        const requestBody = {queryString}
        axios.post(`${API_URL}/token/callback`, requestBody)
    })

    return (
        <div>
            <h1>test</h1>
        </div>
    )
}

export default Test

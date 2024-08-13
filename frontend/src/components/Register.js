import React, { useState } from "react";
import axios from "axios";
import { Box } from "@primer/react";

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/register', {username, email, password});
            alert('Registration Successfull');
        } catch (err) {
            console.error('Registration Error: ', err.response.data);
            alert('Registration Failed');
        }
    }

    return (
        <Box sx={{p:3, borderStyle: "solid", borderWidth: 1}}>
            <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
        </Box>
        
    )
}

export default Register;
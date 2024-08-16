import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextInput } from "@primer/react";
import { useNavigate } from "react-router-dom";

const Register = ({setToken}) => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setNavigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/register', {username, email, password});
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token);
            setNavigate('/notes');
        } catch (err) {
            console.error('Registration Error: ', err.response.data);
            alert('Registration Failed');
        }
    }

    return (
        <Box as="form" 
        onSubmit={handleSubmit}
        sx={{
            backgroundColor: "canvas.default",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: '100vh'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '450px',
                bg: "canvas.inset",
                p: 4,
                borderRadius: 2,
                boxShadow: "shadow.medium"
            }}>
                <TextInput block value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" aria-label="Username" required sx={{ mb: 2 }}/>
                <TextInput block type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" required sx={{ mb: 2 }}/>
                <TextInput block type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" sx={{ mb: 3 }}/>
                <Button block type="submit" variant="primary">Register</Button>
            </Box>
            
        </Box>
        
    )
}

export default Register;
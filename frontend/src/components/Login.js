import React, {useState} from "react";
import axios from "axios";
import { Box, Button, TextInput } from "@primer/react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setNavigate = useNavigate();

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', {email, password});
            setToken(res.data.token);
            console.log(res.data.token);
            localStorage.setItem('token', res.data.token);
            setNavigate('/notes')
        } catch (err) {
            console.error('Login Error', err.responce.data);
        }
    }

    return (
        <Box as="form"
        onSubmit={handleSubmit}
        sx={{
            //p: 3,
            //borderStyle: 'solid',
            //borderWidth: 1,
            //borderRadius: 1,
            //mx: 'auto',
            //width: '400px',
            //bg: "canvas.default"
            display: "flex",
            flexDirection: "column",
            minHeight: '100vh',
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{ 
                width: '100%',
                maxWidth: '450px',
                borderRadius: 2,
                bg: "canvas.inset",
                p: 4,
                boxShadow: "shadow.medium"
                }}>
                <TextInput block type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required sx={{ mb: 2}}/>
                <TextInput block type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required sx={{ mb: 3}}/>
                <Button block type="submit" variant="primary">Login</Button>
                <Button as={Link} to='/register' block variant="outline" sx={{ mt: 3}}>Don't have an account? Register</Button>
            </Box>
            
        </Box>
    );
}

export default Login;
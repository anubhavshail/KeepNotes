import axios from "axios";
import { useEffect, useState } from "react";
import { ActionList, ActionMenu, Avatar, Header, Octicon, Text } from "@primer/react";
import { PencilIcon } from "@primer/octicons-react"
import { useNavigate } from "react-router-dom";

const Nheader = ({token, setToken}) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/user', { headers: { Authorization: `Bearer ${token}` }});
                setUser(res.data);
                console.log(res);
            } catch (error) {
                console.error('Error fetching User', error);
            }
        };
        fetchUser();
    },[token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    }

    const handleChangePassword = () => {
        
    }

    return (
        <Header>
            <Header.Item full>
                <Header.Link
                    href="/"
                    sx={{
                        fontSize: 2
                    }}
                >
                    <Octicon 
                    icon={PencilIcon} 
                    size={20}
                    sx={{
                        mr: 2
                    }}
                    />
                    <span>KeepNotes</span>        
                </Header.Link>
            </Header.Item>
            <Header.Item
            sx={{
                mr: 0
            }}
            >
                <ActionMenu>
                    <ActionMenu.Anchor>
                        <Avatar 
                            src="https://github.com/octocat.png"
                            size={32}
                            alt="@octocat"
                        />
                    </ActionMenu.Anchor>
                    <ActionMenu.Overlay width="medium">
                        <ActionList>
                            <Text as='p' sx={{ ml: 4, mb: 0 }}>{user.username}</Text>
                            <Text as='p' sx={{ ml: 4, mt: 0}}>{user.email}</Text>
                            <ActionList.Divider />
                            <ActionList.Item onClick={handleChangePassword}>Change Password</ActionList.Item>
                            <ActionList.Divider />
                            <ActionList.Item variant="danger" onClick={handleLogout}>Logout</ActionList.Item>
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>

            </Header.Item>
        </Header>
    )
}

export default Nheader;
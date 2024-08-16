import { Box, Button, Heading, Text } from "@primer/react";
import axios from "axios";
import { useEffect, useState } from "react"



const NoteList = ({ token, refreshTrigger }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/notes', { headers: { Authorization: `Bearer ${token}` }});
                setNotes(res.data);
            } catch (err) {
                console.error('Error fetching notes:', err);
            }
        };
        fetchNotes();
    }, [token, refreshTrigger]);

    const handleDelete = async (noteId) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${noteId}`, { headers: { Authorization: `Bearer ${token}`}});
            setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
        } catch (err) {
            console.error('Error deleting note:', err);
            
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            alignItems: "center",
            width: '100%'
        }}>
            <Heading as="h2" >Your Notes</Heading>
            <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'repeat(autofill, minmax(300px, 1fr))',
                width: '100%',
                maxWidth: '1024px'
                }}>
                {notes.map(note => (
                    <Box sx={{
                        bg: 'canvas.overlay',
                        borderRadius: 3,
                        position: "relative",
                        boxShadow: "shadow.small",
                        p: 3
                    }}>
                        <Heading as="h5">{note.title}</Heading>
                        <Text as="p">{note.content}</Text>
                        <Button variant="danger" onClick={() => handleDelete(note.id)} sx={{
                            position: "absolute",
                            bottom: '10px',
                            right: '10px'
                        }}>Delete</Button>
                    </Box>
                ))}
            </Box>
        </Box>
        
    );
};

export default NoteList;
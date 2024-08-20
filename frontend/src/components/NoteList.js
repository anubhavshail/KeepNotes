import { Box, Button, Dialog, Heading, Text } from "@primer/react";
import axios from "axios";
import { useEffect, useState, useRef } from "react"



const NoteList = ({ token, refreshTrigger }) => {
    const [notes, setNotes] = useState([]);
    const [isOpen, setIsOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState({title: '', content: ''})
    const returnFocusRef = useRef(null)

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

    const handleDialog = async (noteId) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/notes/${noteId}`, {headers: { Authorization: `Bearer ${token}` }});
            setSelectedNote({
                title: res.data.title,
                content: res.data.content
            });
            setIsOpen(true)
        } catch (err) {
            console.error('Error fetching note:', err);
        }
    }

    return (
        <Box sx={{
            p: 4,    
        }}>
            <Heading as="h2" sx={{ textAlign: "center", mb: 2}} >Your Notes</Heading>
            <Box sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'auto auto auto',
                }}>
                {notes.map(note => (
                    <Box 
                    data-testid="trigger-button"
                    ref={returnFocusRef}
                    onClick={() => handleDialog(note.id)}
                    sx={{
                        bg: 'canvas.default',
                        borderStyle: "solid",
                        borderColor: "border.default",
                        borderWidth: .5,
                        borderRadius: 2,
                        position: "relative",
                        boxShadow: "shadow.small",
                        p: 3,
                        }}>
                        <Heading as="h5">{note.title}</Heading>
                        <Text as="p">{note.content.substring(0,50)} ...</Text>
                        <Button variant="danger" onClick={() => handleDelete(note.id)} sx={{
                            position: "absolute",
                            bottom: '10px',
                            right: '10px'
                        }}>Delete</Button>
                    </Box>
                ))}
                <Dialog
                    returnFocusRef={returnFocusRef}
                    isOpen={isOpen}
                    onDismiss={() => setIsOpen(false)}
                    aria-labelledby="header">
                        <div data-testid="inner">
                            <Dialog.Header id="header">{selectedNote.title}</Dialog.Header>
                            <Box p={3}>
                                <Text>{selectedNote.content}</Text>
                            </Box>
                        </div>
                </Dialog>
            </Box>
        </Box>
        
    );
};

export default NoteList;
import { Box, Button, Textarea, TextInput } from "@primer/react";
import axios from "axios";
import { useState } from "react";



const NoteForm = ({token, onNoteAdded}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/notes', {title, content}, {headers: {Authorization: `Bearer ${token}`}});
            setTitle('');
            setContent('');
            onNoteAdded();
        } catch (err) {
            console.error('Error adding note:', err);
        }
    };

    return (
        <Box as="form"
        onSubmit={handleSubmit}
        sx={{
            p:3,
            mx: 'auto',
            backgroundColor: 'canvas.default',
            width: '800px'
        }}>
            <TextInput block value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required sx={{ mb: 3}}/>
            <Textarea block value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required sx={{ mb: 3}}/>
            <Button block type="submit" variant="default">Add Note</Button>
        </Box>
    );
};

export default NoteForm;
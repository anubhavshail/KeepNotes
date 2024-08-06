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
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required/>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <button type="submit">Add Note</button>        
        </form>
    );
};

export default NoteForm;
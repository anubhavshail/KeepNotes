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
        <div>
            <h2>Your Notes</h2>
            {notes.map(note => (
                <div key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button type="button" onClick={() =>handleDelete(note.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
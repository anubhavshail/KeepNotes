import axios from "axios";
import { useEffect, useState } from "react"



const NoteList = ({ token }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/notes');
                setNotes(res.data);
            } catch (err) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, [token]);

    return (
        <div>
            <h2>Your Notes</h2>
            {notes.map(note => (
                <div key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
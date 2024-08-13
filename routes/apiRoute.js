const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log('user: ', user);
        

        if (user.rows.length === 0) return res.status(400).send('Invalid Credentials');

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) return res.status(400).send('Invalid Credentials');

        const token = jwt.sign({ id: user.rows[0].id }, jwtSecret, { expiresIn: '5h'});
        res.json({token});
    } catch(err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.route('/notes')
    .get( authenticateToken, async (req, res) => {
        try {
            const allNotes = await pool.query('SELECT * FROM notes WHERE user_id = $1;', [req.user.id]);
            res.json(allNotes.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Erro");
        }
    })

    .post( authenticateToken, async (req, res) => {
        try {
            const {title, content} = req.body;
            const newNote = await pool.query('INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, content, req.user.id]);
            res.json(newNote.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

router.route('/notes/:id')
    .get( authenticateToken, async (req, res) => {
        try {
            const {id} = req.params;
            const getNote = await pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
            if (getNote.rows.length === 0) return res.status(403).send('Access Denied');

            res.json(getNote.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Erro");
        }

    })

    .put( authenticateToken, async (req, res) => {
        try {
            const {id} = req.params
            const {title, content} = req.body;

            const note = await pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);
            if(note.rows.length === 0) return res.status(403).send('Access Denied');

            const updateNote = await pool.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, id]);
            res.json(updateNote.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })

    .delete ( authenticateToken, async (req, res) => {
        try {
            const {id} = req.params
            const deleteNote = await pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, req.user.id]);

            if(deleteNote.rows.length === 0) return res.status(403).send('Access Denied');

            await pool.query('DELETE FROM notes WHERE id = $1', [id]);
            res.json({ message: "Note deleted successfully"});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })

module.exports = router;
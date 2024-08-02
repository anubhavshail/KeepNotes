const express = require('express');
const cors = require('cors');
require('dotenv').config();
const apiRoute = require('./routes/apiRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoute )

app.listen(port, () => {
    console.log(`Servier is running on port ${port}`);
})

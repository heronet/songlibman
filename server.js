require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRoute = require('./routes/usersRoute');
const songsRoute = require('./routes/songsRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users/', usersRoute);
app.use('/api/songs/', songsRoute);

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to Database`);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})



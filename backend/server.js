const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data.js');
const cors = require('cors');
const connectDb = require('./config/db');

const app = express();
app.use(cors());
dotenv.config();
connectDb();

app.get('/',(req,res)=>{
    res.send('API is running');
});

app.get('/api/chats',(req,res)=>{
    res.send(chats);
});

app.get('/api/chat/:id',(req,res)=>{
    res.send('Unique Id Chat',req.params.id);
});
const port = process.env.PORT || 3000;

app.listen(3000,console.log(`Server is Listening on port ${port}`));
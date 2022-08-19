const express = require('express');
const dotenv = require('dotenv');
// const chats = require('./data/data.js');
const cors = require('cors');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoute = require('./routes/messageRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

const app = express();
// we need to accept json data comming from the frontend
app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.get('/',(req,res)=>{
    res.send('API is running');
});
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoute)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(3000,console.log(`Server is Listening on port ${port}`));
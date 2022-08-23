const express = require('express');
const dotenv = require('dotenv');
// const chats = require('./data/data.js');
const cors = require('cors');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoute = require('./routes/messageRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware');
const path = require('path');

const app = express();
// we need to accept json data comming from the frontend
app.use(express.json());
app.use(cors());
dotenv.config();
connectDb();

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoute);

//  ---------------Deployment----------------
const __dirname1 = path.resolve();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname1, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

//  ---------------Deployment----------------


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(port,console.log(`Server is Listening on port ${port}`));

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"*"
    },
});
io.on("connection",(socket)=>{
    console.log("Connected to socket.io");
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("User joined the room",room)
    });
    // For typing animation
    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));

    socket.on("new message",(newMessagereceived)=>{
        let chat = newMessagereceived.chat;
        if(!chat.users) return console.log("chat.users is not defined");
        chat.users.forEach(user =>{
            if(user._id == newMessagereceived.sender._id) return;
            socket.in(user._id).emit("message received",newMessagereceived);
        })
    });
    socket.off("setup",()=>{
        console.log("User Disconnected");
        socket.leave(userData._id);
    });
});
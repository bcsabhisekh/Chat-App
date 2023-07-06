const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const PORT = 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// says whether user are connected to socket server or not having id as connection.
io.on("connection", (socket) => {
    console.log(socket.id);

    // here data is id
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} and Room ID: ${data}`);
    })

    socket.on("send_message", (data) => {
        // console.log(data);
        socket.to(data.room).emit("recieve_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
});



server.listen(PORT, () => {
    console.log("Server started at Port", PORT);
});
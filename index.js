import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import mongodb from "mongodb";
import cors from "cors";
import { connect } from "./config.js";
import { chatModel } from "./chat.schema.js";

const app = express();
//create server using http
const server = http.createServer(app);

// connect server to socket io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// use socket events
const users = {};
io.on("connection", (socket) => {
  console.log("connection is established");

  socket.on("new-user-joined", (name) => {
    console.log("new-user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      name: users[socket.id],
      message: message,
    });
    const newChat = new chatModel({
      username: users[socket.id],
      message: message,
      timestamp: new Date(),
    });
    newChat.save();
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(8888, () => {
  console.log("App is listening on 8888");
  connect();
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import modules from "./modules/app.module.js";
import renderModules from "./render/render.module.js";
import { Server } from "socket.io";
import http from "http";
import { verifyToken } from "./lib/jwt.js";
import { ee } from "./lib/eventEmitter.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("views", join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", renderModules.router);
app.use("/api", modules.router);

server.listen(config.port, () => {
  console.log(`http://localhost:${config.port}`);
});

const onlineUsers = new Map();

const responseDb = new Set();

io.on("connection", (socket) => {
  const cookie = socket.handshake.headers?.cookie;

  if (cookie) {
    const token = cookie.split("=")[1];
    if (token) {
      try {
        const userId = verifyToken(token);

        onlineUsers.set(socket.id, userId);
      } catch (error) {
        console.log("error socket:", error);
      }
    }
  }

  io.emit("online-users-count", onlineUsers.size);

  ee.on("new-user", (data) => {
    if (!responseDb.has(data.id)) {
      socket.broadcast.emit("new-user", data.data);
      responseDb.add(data.id);

      responseDb.forEach((uuid) => {
        if (uuid !== data.id) {
          responseDb.delete(uuid);
        }
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);

    io.emit("online-users-count", onlineUsers.size);
  });
});

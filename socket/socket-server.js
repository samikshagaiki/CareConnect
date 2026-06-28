const { Server } = require("socket.io");

const PORT =
  process.env.PORT || 4000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:3000";

const io = new Server(PORT, {
  cors: {
    origin: CLIENT_URL,
    credentials: true,
  },
});

console.log(
  `✅ Socket Server Running on Port ${PORT}`
);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  // ------------------------
  // USER JOINS
  // ------------------------

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);

    socket.join(userId);

    io.emit(
      "online-users",
      Array.from(onlineUsers.keys())
    );

    console.log(userId, "joined");
  });

  // ------------------------
  // SEND MESSAGE
  // ------------------------

  socket.on("send-message", (message) => {

    /*
      message = {

        conversationId,

        senderId,

        receiverId,

        text,

        createdAt

      }

    */

    io.to(message.receiverId).emit(
      "receive-message",
      message
    );


io.emit("conversation-updated", {
  conversationId: message.conversationId,
  lastMessage: message.text,
  createdAt: message.createdAt,
});

    io.to(message.senderId).emit(
      "receive-message",
      message
    );
  });

  

  // ------------------------
  // USER TYPING
  // ------------------------

  socket.on("typing", (data) => {

  socket.to(data.receiverId).emit(
    "typing",
    {
      senderId: data.senderId,
    }
  );

});

  // ------------------------
  // STOP TYPING
  // ------------------------

 socket.on("stop-typing", (data) => {

  socket.to(data.receiverId).emit(
    "stop-typing",
    {
      senderId: data.senderId,
    }
  );

});

  // ------------------------
// READ RECEIPT
// ------------------------

socket.on("read-message", (data) => {

  io.to(data.senderId).emit(
    "message-read",
    {
      conversationId: data.conversationId,
      readerId: data.readerId,
    }
  );

});

  // ------------------------
  // DISCONNECT
  // ------------------------

  socket.on("disconnect", () => {

    for (const [userId, socketId] of onlineUsers.entries()) {

      if (socketId === socket.id) {

        onlineUsers.delete(userId);

        break;

      }

    }

    io.emit(
      "online-users",
      Array.from(onlineUsers.keys())
    );

    console.log("🔴 Disconnected:", socket.id);

  });

});
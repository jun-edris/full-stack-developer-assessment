const express = require('express');
const dbConnect = require('./db.js');
require('dotenv').config();
const { errorHandler, routeNotFound } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const path = require('path');

dbConnect();
const app = express();
app.use(express.json());

// Main routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/notification', notificationRoutes);

// Error handling routes
app.use(routeNotFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5000, () => {
	console.log(`\nServer is UP on PORT ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log('Sockets are in action');
	socket.on('setup', (userData) => {
		socket.join(userData._id);
		console.log(userData.name, 'connected');
		socket.emit('connected');
	});
	socket.on('join chat', (room) => {
		socket.join(room);
		console.log('User joined room: ' + room);
	});
	socket.on('new message', (newMessage) => {
		const chat = newMessage.chatId;
		if (!chat.users) return console.log('chat.users not defined');

		chat.users.forEach((user) => {
			if (user._id === newMessage.sender._id) return;
			socket.in(user._id).emit('message received', newMessage);
		});
		socket.on('typing', (room) => {
			socket.in(room).emit('typing');
		});
		socket.on('stop typing', (room) => {
			socket.in(room).emit('stop typing');
		});
	});
	socket.off('setup', () => {
		console.log('USER DISCONNECTED');
		socket.leave(userData._id);
	});
});

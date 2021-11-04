import express from 'express';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { Socket } from 'socket.io';
dotenv.config({ path: path.resolve(__dirname, './config/.env.development') });

import dbManager from './service/dbManager'

const indexRouter = require('./routes/index');
const oauthRouter = require('./routes/oauth');
const apiRouter = require('./routes/api');

const debug = require('debug')('server:server');
const http = require('http');
const app = express();
const port = 4000;
const FileStore = sessionFileStore(session);

dbManager.sync()

const cors = require('cors');
app.use(cors());

app.use(
  session({
    //HttpOnly: true,
    //secure: process.env.HTTPS_FALSE ? false : true,
    // typescript es6 import 형식으로 바꾸면서 secure는 자동 설정 되는듯?
    // 배포해서 https로 실험해봐야 확실할듯...
    secret: 'secret key', // 암호화할 때 쓰이는 키라는데...
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.HTTPS_FALSE ? false : true,
      maxAge: 24000 * 60 * 60
    },
    store: new FileStore({ path: path.resolve(__dirname, './sessions/') })
  })
);

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
  console.log('✅ Socket connected from "http://localhost:3000"');

  socket.on('send message', (item: { message: string }) => {
    io.emit('receive message', { message: item.message });
  });
});

server.listen(port, () => {
  console.log(`✅ Server Listening on : http://localhost:${port}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

module.exports = app;
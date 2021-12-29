const express = require('express');
const mongoose = require('mongoose');
const math = require('mathjs');
const cors = require('cors');
const socketIO = require('socket.io');
const Weights = require('./Models/Weights');
require('dotenv/config');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING, () => {
  console.log('DB Connection successfull');
});

app.post('/learn', async (req, res) => {
  const { wih, who, hiddenLayerNodes, outputNodes, learningRate } = req.body;
  console.log('aaaaaaaaaaaaaaaaa');
  try {
    const exists = await Weights.find();
    if (exists.length) {
      await Weights.deleteMany();
    }
    const weights = new Weights({
      wih,
      who,
      hiddenLayerNodes,
      outputNodes,
      learningRate
    });
    await weights.save();
    res.send({ success: 'true' });
  } catch (err) {
    res.send(err);
  }
});

app.get('/test', async (req, res) => {
  try {
    const parameters = await Weights.find();
    res.send(parameters[0]);
  } catch (err) {
    console.log(err);
  }
});

const server = app.listen(5000, () => {
  console.log('Up and run port 5000');
});

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('A user connect');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

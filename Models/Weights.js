const mongoose = require('mongoose');

const WeightsSchema = new mongoose.Schema({
  wih: Object,
  who: Object,
  hiddenLayerNodes: Number,
  outputNodes: Number,
  learningRate: Number
});

module.exports = mongoose.model('Weight', WeightsSchema);

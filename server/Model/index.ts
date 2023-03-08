'use strict'
const mongoose = require('mongoose');

async function mgConnnect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/timelineImages');
};

const commentSchema = new mongoose.Schema({
  position: Number,
  text: String
})

const imageSchema = new mongoose.Schema({
  id: Number,
  picture: String,
  timeline: Number,
  alt: String,
  wiki: String,
  constraint: String,
  comments: [commentSchema]
});

const imageModel = mongoose.model('universeimages', imageSchema);


mgConnnect();

export = imageModel
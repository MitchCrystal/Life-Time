'use strict'
const mongoose = require('mongoose');
import 'dotenv/config';
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbCluster = process.env.MONGO_CLUSTER;
const dbName = process.env.MONGO_DB_NAME;

async function mgConnect() {
  await mongoose.connect(
    `mongodb+srv://${user}:${password}@${dbCluster}.mongodb.net/${dbName}`,
  );
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


mgConnect();

export = imageModel
'use strict';

const mongoose = require('mongoose');
import imageModel from './Model/index';
import imagelist from './Model/universeimages.json';

async function populateDB() {
  try {
    await imageModel.insertMany(imagelist);
    console.log('Database Seeded');
  } catch (err) {
    console.log(err);
  }
  await mongoose.disconnect();

  process.exit(0);
}

populateDB();

'use strict'

const model = require('./index');

export async function getDBImageList() {
  try {
    const result = await model.find();
    return result;
  }
  catch (err) {
    console.log(err)
  }
};


'use strict'

import imageModel from './index';

export async function getDBImageList() {
  try {
    const result = await imageModel.find();
    return result;
  }
  catch (err) {
    console.log(err)
  }
};



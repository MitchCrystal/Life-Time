import * as fs from 'node:fs/promises'
import Koa from 'koa'
const imageFolder = './Assets'


export async function getImages(ctx: Koa.Context) {
  try {
    //console.log('controller accessed')
    const imgs = await fs.readdir(imageFolder)
    ctx.body = JSON.stringify(imgs);
    //console.log(ctx.body)
    ctx.status = 200
  }
  catch (err) {
    console.log(err)
    ctx.status = 401
  }
}
import Koa from 'koa'
import { getDBImageList } from '../Model/model';


export async function getImages(ctx: Koa.Context) {
  try {
    ctx.body = await getDBImageList();
    ctx.status = 200
  }
  catch (err) {
    console.log('my error',err)
    ctx.status = 401
  }
}

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

//POSSIBLY MOVE CALL TO BACKEND
// export async function getWiki(ctx: Koa.Context) {
//   try {
//     //const wiki = await fetch()
//     // console.log(wiki)
//     // console.log(wiki.json())
//     // ctx.body = await wiki.json()
//     // console.log(ctx.body)
//     // ctx.status = 200
//   }
//   catch (err) {
//     console.log(err)
//     ctx.status = 401
//   }
// }
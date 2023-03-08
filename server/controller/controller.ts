import Koa from 'koa'
import { getDBImageList } from '../Model/model';

const wikiUrlForID = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=1&srsearch=`


export async function getImages(ctx: Koa.Context) {
  try {
    ctx.body = await getDBImageList();
    // console.log(ctx.body)
    ctx.status = 200
  }
  catch (err) {
    console.log('my error',err)
    ctx.status = 401
  }
}


// POSSIBLY MOVE CALL TO BACKEND
// export async function getWiki(ctx: Koa.Context) {
//   try {
//     const wiki = await fetch(wikiUrlForID+ctx.params.id)
//     console.log(wiki)
//     console.log(wiki.json())
//     ctx.body = await wiki.json()
//     console.log(ctx.body)
//     ctx.status = 200
//   }
//   catch (err) {
//     console.log(err)
//     ctx.status = 401
//   }
// }
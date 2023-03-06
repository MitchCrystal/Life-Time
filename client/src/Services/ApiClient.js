const baseURI = 'http://127.0.0.1:4500'
const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=1&srsearch=`

export async function getImageList() {
  //console.log('get image list in api client accessed')
  const result = await fetch(baseURI+'/images')
  //console.log(result)
  return result.json()
}

export async function getWiki(wikisearch) {
  const result = await fetch(wikiUrl+wikisearch)
   return result.json()
 }
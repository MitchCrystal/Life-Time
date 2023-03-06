const baseURI = 'http://127.0.0.1:4500'
const wikiUrlForID = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=1&srsearch=`
const wikiUrlForDetail = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&pageids=`
const detailSuffix = `&formatversion=2&exchars=1000&explaintext=1`

export async function getImageList() {
  //console.log('get image list in api client accessed')
  const result = await fetch(baseURI+'/images')
  //console.log(result)
  return result.json()
}

export async function getWikiID(wikiIDsearch) {
  const result = await fetch(wikiUrlForID+wikiIDsearch)
   return result.json()
}

export async function getWikiDetail(wikiID) {
  const result = await fetch(wikiUrlForDetail + wikiID + detailSuffix)
  return result.json()
 }
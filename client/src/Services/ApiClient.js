const baseURI = 'http://127.0.0.1:4500'

export async function getImageList() {
  //console.log('get image list in api client accessed')
  const result = await fetch(baseURI+'/images')
  //console.log(result)
  return result.json()
}

// export async function getBooks() {
//   const result = await fetch(apiURL+'/books')
//   return result.json()
// }
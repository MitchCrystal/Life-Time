import imagesArr from '../universeimages.json';

const wikiUrlForID = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=1&srsearch=`;
const wikiUrlForDetail = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&pageids=`;
const detailSuffix = `&formatversion=2&exchars=500&explaintext=1`;
const shorterDetailSuffix = `&formatversion=2&exchars=350&explaintext=1`;

export async function getImageList() {

  return imagesArr;
}

export async function getWikiID(wikiIDsearch) {
  const result = await fetch(wikiUrlForID + wikiIDsearch);
  return result.json();
}

export async function getWikiDetail(wikiID) {
  const result = await fetch(wikiUrlForDetail + wikiID + detailSuffix);
  return result.json();
}

export async function getShorterWikiDetail(wikiID) {
  const result = await fetch(wikiUrlForDetail + wikiID + shorterDetailSuffix);
  return result.json();
}
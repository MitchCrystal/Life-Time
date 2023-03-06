import * as fs from 'node:fs/promises'
import Koa from 'koa'
const imageFolder = './Assets'


export async function getImages(ctx: Koa.Context) {
  try {
    //console.log('controller accessed')
    const imgs = await fs.readdir(imageFolder)

    const imgs2 = [{ id: 0, picture: '01-bigbang.avif', timeline: 0.0000, alt: "Big Bang", constraint: '40vw' },
  { id: 1, picture: '02-atomform.webp', timeline: 0.0022, alt: "First Atoms", constraint: '40vw' },
  { id: 2, picture: '03-starform.webp', timeline: 0.7246, alt: "First Stars", constraint: '130vw' },
  { id: 3, picture: '04-1066px-Andromeda_Galaxy.jpg', timeline: 2.8986, alt: "First Galaxies Form", constraint: '345vw' },
  { id: 4, picture: '05-milky-way.jpg', timeline: 8.6957, alt: "Milky Way Forms", constraint: '700vw' },
  { id: 5, picture: '06-sun-like-star.jpeg', timeline: 27.5362, alt: "First Sun-like Stars Form", constraint:'700vw' },
  { id: 6, picture: '07-solarsystem.png', timeline: 66.6667, alt: "Solar System Forms", constraint:'40vw' },
  { id: 7, picture: '08-FullMoon2010.jpg.webp', timeline: 67.3913, alt: "Formation of the Moon", constraint:'200vw' },
  { id: 8, picture: '09-lateheavybom.jpg', timeline: 71.0145, alt: "Heavy Bombardment", constraint: '200vw'},
  { id: 9, picture: '10-life.jpg', timeline: 74.6377, alt: "First Forms of Life Emerge", constraint: '40vw'},
  { id: 10, picture: '11-photosynthesis.jpg', timeline: 75.3623, alt: "Photosynthesis Develops", constraint:'300vw' },
  { id: 11, picture: '12-oxygen in atmosphere.webp', timeline: 82.6087, alt: "Oxygen in Atmosphere", constraint:'230vw' },
  { id: 12, picture: '13-eukaryotes.jpg', timeline: 86.9565, alt: "First Cells with a Nucleus (Eukaryotes)", constraint:'430vw' },
  { id: 13, picture: '14-multicellular.jpg', timeline: 95.5797, alt: "Multicellular Life Begins", constraint:'5vw'},
  { id: 14, picture: '15-ozone layer.webp', timeline: 95.6522, alt: "Ozone Layer Forms", constraint:'5vw' },
  { id: 15, picture: '16-comb_jelly4_h.jpg', timeline: 95.7971, alt: "First Animals", constraint:'30vw' },
  { id: 16, picture: '17-Cooksonia_NT.jpg', timeline: 96.3768, alt: "First Plants", constraint:'29vw' },
  { id: 17, picture: '18-lifeonland.jpg', timeline: 96.8841, alt: "Life on Land", constraint: '60vw'},
  { id: 18, picture: '19-eoraptor.webp', timeline: 98.2609, alt: "First Dinosaurs", constraint: '15vw'},
  { id: 19, picture: '20-earlymammals.jpg', timeline: 98.5507, alt: "First Mammals", constraint: '20vw'},
  { id: 20, picture: '21-dinosaurs.jpg', timeline: 98.9130, alt: "Brachiosaurus", constraint: '25vw'},
  { id: 21, picture: '22-trex.jpg', timeline: 99.4203, alt: "T-rex", constraint: '5vw'},
  { id: 22, picture: '23-dinosaur-extinction.jpg', timeline: 99.5217, alt: "Extinction of Dinosaurs", constraint:'15vw' },
  { id: 23, picture: '24-Proconsul.webp', timeline: 99.8986, alt: "First Apes Appear", constraint:'5vw' },
  { id: 24, picture: '25-Image+600+H+habilis.jpg', timeline: 99.9819, alt: "Primitive Ancestors of Humans Appear", constraint: '5vw'},
  { id: 25, picture: '26-homo sapiens.jpeg', timeline: 99.9986, alt: "Homo Sapiens Appear", constraint: '5vw'},
  { id: 26, picture: '27- stonehenge.webp', timeline: 100.0000, alt: "Stonehenge is Built", constraint:'5vw' }]

    ctx.body = JSON.stringify(imgs2);
    //console.log(ctx.body)
    ctx.status = 200
  }
  catch (err) {
    console.log(err)
    ctx.status = 401
  }
}

export async function getMov(ctx: Koa.Context) {
  try {
    //const movs = await fetch()
    // console.log(movs)
    // console.log(movs.json())
    // ctx.body = await movs.json()
    // console.log(ctx.body)
    // ctx.status = 200
  }
  catch (err) {
    console.log(err)
    ctx.status = 401
  }
}

export async function getWiki(ctx: Koa.Context) {
  try {
    //const wiki = await fetch()
    // console.log(wiki)
    // console.log(wiki.json())
    // ctx.body = await wiki.json()
    // console.log(ctx.body)
    // ctx.status = 200
  }
  catch (err) {
    console.log(err)
    ctx.status = 401
  }
}


const myYears = 26.8//13.8
const yearsList = Math.ceil(myYears);
//console.log({ yearsList })

  let dob = 1982
  let defaultYears = 100;
  let units = 's'
  let type = 'individual'
  const types = ['individual', 'h_history', 'life', 'universe']
  const unit_types = ['years', 'centuries', 'millions', 'billions']


  const totalPoints = Array(yearsList+1).fill(yearsList);
  for (let i = 0; i < totalPoints.length; i++) {
    totalPoints[i] -= i;
    totalPoints[i] += ' Billion Years Ago'
  }

  //console.log(totalPoints)
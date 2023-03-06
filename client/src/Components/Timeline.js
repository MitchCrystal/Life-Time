
// import useMousePosition from "../Hooks/useMousePosition"
import React, { useState, forwardRef, useEffect } from "react"
import { getWikiDetail, getWikiID } from "../Services/ApiClient"


//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({imgList}, tlref)=>{
  // const locateMouse = useMousePosition()
  const [counter, setCounter] = useState(0)
  const [furtherInfoBox, setFurtherInfoBox] = useState('')
  const [splashVis, setSplashVis] = useState(true)
  const [bigBang, setBigBang] = useState(0)
  const [wikiLink, setWikiLink] = useState('')
  const [furtherInfoTitle, setFurtherInfoTitle] = useState('')
  const [furtherInfoPic, setFurtherInfoPic] = useState('')
  const [] = useState('')

const segmentsArr = [
    { timeago: 13.8, placement: 0 },
    { timeago: 13, placement: 5.8 },
    { timeago: 12, placement: 13 },
    { timeago: 11, placement: 20.3 },
    { timeago: 10, placement: 27.5 },
    { timeago: 9, placement: 34.8 },
    { timeago: 8, placement: 42 },
    { timeago: 7, placement: 49.2 },
    { timeago: 6, placement: 56.5 },
    { timeago: 5, placement: 63.8 },
    { timeago: 4, placement: 71 },
    { timeago: 3, placement: 78.3 },
    { timeago: 2, placement: 85.5 },
    { timeago: 1, placement: 92.8 },
  { timeago: 0, placement: 100 }]


useEffect(() => {
  function handlePageScroll(event) {
    let currentScroll = window.scrollX / (document.body.scrollWidth - window.innerWidth)
    const maxTime = 13800000000
    let currentTime = Math.ceil(maxTime * currentScroll )
    maxTime <= currentTime ? setCounter(maxTime) : setCounter(currentTime)
  };
  window.addEventListener('scroll', handlePageScroll);
  return ()=>{window.removeEventListener('scroll',handlePageScroll)}
}, [])


async function handleImageClick(event) {
  setFurtherInfoPic(imgList[event.target.dataset.nav].picture)
  setFurtherInfoTitle(event.target.alt)
  await getWikiID(event.target.alt)
    .then(async result => {
      setWikiLink('https://en.wikipedia.org/?curid='+result.query.search[0].pageid);
      return await getWikiDetail(result.query.search[0].pageid)
    })
    .then(result => setFurtherInfoBox(result.query.pages[0].extract))
  document.body.dataset.shown = 'true'
}

function handleButtonClick(event) {
  document.body.dataset.shown = 'false'
}

function handleLogoClick(event) {
  setBigBang(1)
  setTimeout(() => {
    setBigBang(2)
  }, 5000);
}

const width = 430
const compound_width = imgList ? width * Math.abs(segmentsArr[segmentsArr.length-1].timeago-segmentsArr[0].timeago) : 0
const fullwidth = compound_width + (200)


return (
<>
  {bigBang < 2 && <div id="splash" style={bigBang > 0 ? {animationName: 'hide'} : {animationName: 'none'}}>
    {bigBang < 1 && <><div id="page-title">Life/Time</div>
    <img id='logo' src="/logo.png" onClick={handleLogoClick} draggable='false'></img></>}
    {bigBang === 1 && <div id="singularity"></div>}
    {bigBang < 1 && <span style={{ color: '#ffb700' }}>Click the logo to trigger the Big Bang</span>}
  </div>}

  <main>
    <h1 style={{ marginLeft: '3rem', fontSize: '4rem' }}>History of the Universe</h1>
  {counter >= 1000000000 && <div><h2 id="time-counter">{counter.toLocaleString('en-GB')} years since Big Bang</h2></div>}
  {imgList.length > 0 && <>
      <div style={{width: compound_width+'vw', top: '7.5vh', left: '100vw', position: 'relative'}}>
        {segmentsArr.map(segment =>
          <div key={segment.timeago} style={{ left: segment.placement+'%'}} className="time-marker">{segment.timeago !== 0 ? segment.timeago+' billion years ago': 'Now'}</div>
        )}
    </div>

    <div id="wholeTL" style={{ width: fullwidth + 'vw' }}>
        <div className="buffer">

            {/*SHOULD TRY AND CLEAN UP FIRST IMAGE JSX STRUCTURE*/}
            {/*PUT A MINI DESCRIPTION HERE FOR HOW THE TIMELINE WORKS*/}
          <div id='bigbangimgbox' className='tl-imagebox' key={imgList[0].id} style={{ width: imgList[0].constraint }}>
            <div className="tl-image-and-tag">
              <img id='bigbangimg' className="tl-image" src={imgList[0].picture} title={imgList[0].alt} alt={imgList[0].alt} draggable='false' data-nav={imgList[0].id} onClick={handleImageClick}></img>
              <div className="tl-imagetag">{imgList[0].alt}</div>
            </div>
          </div>
        </div>

      <div id="uni" className='timeline' style={{ width: compound_width+'vw' }} ref={tlref}>

        {imgList.map(image => image.id > 0 && image.id < imgList.length-2 &&
          <div className='tl-imagebox' key={image.id} style={{ left: image.timeline + '%', width: image.constraint }}>
            <div className="tl-image-and-tag">
              <img className="tl-image" src={image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
              <div className="tl-imagetag">{image.alt}</div>
            </div>
          </div>)}

      </div>
          <div className="buffer">
            <div style={{ width: '5vw' }} ></div>
            <div style={{width: '20vw', marginTop: '5vh' }}>These next two events are so recent that they don't even appear on the timeline because their timescale is so tiny!</div>
            {imgList.map(image => image.id >= imgList.length-2 &&
            <div className='tl-imagebox endimgbox' key={image.id} style={{ width: image.constraint }}>
              <div className="tl-image-and-tag">
                <img className="tl-image endimg" src={image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
                <div className="tl-imagetag">{image.alt}</div>
                </div>
                {/*PUT A MINI DESCRIPTION HERE FOR THE LAST TWO EVENTS*/}

            </div>)}
            <div style={{ width: '5vw' }} ></div>
      </div>
    </div></>}
  </main>

  <div className="further-info">
    <h3>{furtherInfoTitle}</h3>
    <button onClick={handleButtonClick}>Back to timeline <span>↑</span></button>
    <div className="info-text">
      <div><p>{furtherInfoBox}</p>
        <br></br>
        <p style={{ display: "inline" }}>More information at → <a href={wikiLink}>Wikipedia</a></p>
      </div>
      <div>
        <img className="furtherinfopic" src={furtherInfoPic}></img>
      </div>
    </div>
  </div>
</>)
})

export default Timeline

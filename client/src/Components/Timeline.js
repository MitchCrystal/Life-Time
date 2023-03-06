
// import useMousePosition from "../Hooks/useMousePosition"
// import React, { useRef, useEffect, useState } from "react"
import React, { useState } from "react"
import { forwardRef, useEffect } from "react"
import { getWikiDetail, getWikiID } from "../Services/ApiClient"


//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({imgList}, tlref)=>{
  // const locateMouse = useMousePosition()
  const [counter, setCounter] = useState(0)
  //const [counterVis, setCounterVis] = useState('hidden')
  const [furtherInfoBox, setFurtherInfoBox] = useState(0)


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
  // const imgpath = './Assets/'



    useEffect(() => {
      function handlePageScroll(event) {

        let currentScroll = window.scrollX / (document.body.scrollWidth - window.innerWidth)
        //console.log(Math.ceil(currentScroll * 100) + '%')

        const maxTime = 13800000000
      let currentTime = Math.ceil(maxTime * currentScroll )
      maxTime <= currentTime ? setCounter(maxTime) : setCounter(currentTime)
     // setCounter(Math.ceil(maxtime * (window.scrollX / (document.body.scrollWidth-window.innerWidth))))

    };
    window.addEventListener('scroll', handlePageScroll);
    return ()=>{window.removeEventListener('scroll',handlePageScroll)}

    }, [])

  // counter >= 1000000000 ? setCounterVis('shown') : setCounterVis('hidden')

  async function handleImageClick(event) {
    await getWikiID(event.target.dataset.nav)
      .then(async result => {
        console.log(result.query.search[0]);
        await getWikiDetail(result.query.search[0].pageid)
      })
      .then(result => setFurtherInfoBox(result.query.pages[0].extract))
    document.body.dataset.shown = 'true'
  }

  function handleButtonClick(event) {
    document.body.dataset.shown = 'false'
  }

  function handleLogoClick(event) {
    
  }

const width = 430
  const compound_width = imgList ? width * Math.abs(segmentsArr[segmentsArr.length-1].timeago-segmentsArr[0].timeago) : 0
  const fullwidth = compound_width + (200)


  return (<>
    <div id="splash"><div id="page-title">Life/Time</div>
    <img id='logo' src="/logo.png" onClick={handleLogoClick}></img>
      <span style={{ color: '#ffb700' }}>Click the logo to trigger the Big Bang</span>
    </div>

    <main>
    <h1>History of the Universe</h1>
    {counter >= 1000000000 && <div><h2 id="time-counter">{counter.toLocaleString('en-GB')} years since Big Bang</h2></div>}
    {imgList.length > 0 && <>
        <div style={{width: compound_width+'vw', top: '7.5vh', left: '100vw', position: 'relative'}}>
          {segmentsArr.map(segment =>
            <div key={segment.timeago} style={{ left: segment.placement+'%'}} className="time-marker">{segment.timeago !== 0 ? segment.timeago+' billion years ago': 'Now'}</div>
          )}
      </div>

      <div id="wholeTL" style={{ width: fullwidth + 'vw' }}>
        <div className="buffer bigbang"></div>
        <div id="uni" className='timeline' style={{ width: compound_width+'vw' }} ref={tlref}>

          {imgList.map(image =>
            <div className='tl-imagebox' key={image.id} style={{ left: image.timeline + '%', width: image.constraint }}>
              <div className="tl-image-and-tag">
              <img className="tl-image" src={image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.alt} onClick={handleImageClick}></img>
            <div className="tl-imagetag">{image.alt}</div>
                </div>
            </div>)}

        </div>
        <div className="buffer"></div>
      </div></>}
    </main>

    <div className="further-info">
      <h3>Put further info here</h3>
      <button onClick={handleButtonClick}>Back to timeline <span>↑</span></button>
      <div className="info-text">{furtherInfoBox}</div>
    </div>
  </>)
})

export default Timeline

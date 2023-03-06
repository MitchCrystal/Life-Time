
// import useMousePosition from "../Hooks/useMousePosition"
// import React, { useRef, useEffect, useState } from "react"
import React, { useState } from "react"
import { forwardRef, useEffect } from "react"
import jsonedStuff from "../Services/movies1993"
import { getWiki } from "../Services/ApiClient"

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
    { timeago: 'Now', placement: 100 }]
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

  function handleImageClick(event) {
     //console.log(+event.target.dataset.nav)
    getWiki(event.target.dataset.nav)
      .then(result => { setFurtherInfoBox(result.query.search[0].snippet)})
     //setFurtherInfoBox(+event.target.dataset.nav)

    document.body.dataset.shown = 'true'
  }

  function handleButtonClick(event) {
    document.body.dataset.shown = 'false'
  }



const width = 230
  const compound_width = imgList ? width * segmentsArr.length * 2 : 0
  const fullwidth = compound_width + (200)
//console.log(imgList)

  return (<><main><h1>History of the Universe</h1>
    {counter >= 1000000000 && <div><h2 id="time-counter">{counter.toLocaleString('en-GB')} years since Big Bang</h2></div>}
    {imgList.length > 0 && <>
        <div style={{width: compound_width+'vw', top: '5vh', left: '100vw', position: 'relative'}}>
          {segmentsArr.map(segment =>
            <div key={segment.timeago} style={{ left: segment.placement+'%'}} className="time-marker">{typeof segment.timeago === 'number' ? segment.timeago+' billion years ago': segment.timeago}</div>
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
       {/* {imgList.length > 0 && <div id="uni" className='timeline' style={{ width: width }} ref={tlref}>
      {imgList.map(image => <div className='imagebox' key={image.id}>
        <img src={image.picture} title={image.alt} draggable='false'></img>
      </div>)}
    </div>} */}
 </>)
})

export default Timeline

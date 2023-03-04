
// import useMousePosition from "../Hooks/useMousePosition"
// import React, { useRef, useEffect, useState } from "react"
import React, { useState } from "react"
import { forwardRef, useEffect } from "react"

//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({imgList}, tlref)=>{
  // const locateMouse = useMousePosition()
  const [counter, setCounter] = useState(0)
  const [counterVis, setCounterVis] = useState('hidden')
  const [furtherInfoBox, setFurtherInfoBox] = useState('')

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
    { timeago: 'Now', placement: 99.824 }]
  // const imgpath = './Assets/'

  const FAKETEXTCONTENT = ''
// const [width, setWidth] = useState(0)
// const ref = useRef(null);

  // useEffect(() => {
  //   setWidth(ref.current.getBoundingClientRect().width)
  // }, []);

    useEffect(() => {
    function handlePageScroll(event) {
      // console.log(window.scrollX)
      // console.log(document.body.scrollWidth)
      // console.log(window.scrollX/document.body.scrollWidth*100)
      //let percent = Math.ceil(window.scrollX / document.body.scrollWidth * 100)
// console.log(window.scrollX+(window.innerWidth/20)+'px')
      setCounter(Math.ceil(13800000000 * (window.scrollX / document.body.scrollWidth)))

    };
    window.addEventListener('scroll', handlePageScroll);
    return ()=>{window.removeEventListener('scroll',handlePageScroll)}

    }, [])

  // counter >= 1000000000 ? setCounterVis('shown') : setCounterVis('hidden')

  function handleImageClick(event) {
    // console.log(event.target.dataset.nav)
    setFurtherInfoBox(event.target.dataset.nav)
    document.body.dataset.shown = 'false'
  }

   function handleButtonClick(event) {
    // console.log(event.target.dataset.nav)
    setFurtherInfoBox(event.target.dataset.nav)
    document.body.dataset.shown = 'true'
  }



const width = 2000
const compound_width = imgList? width*segmentsArr.length*2: 0
//console.log(imgList)

  return (<><main><h1>History of the Universe</h1>
    {counter >= 1000000000 && <div id="counter"><h2>{counter.toLocaleString('en-GB')} years since Big Bang</h2></div>}
    {imgList.length > 0 &&
      <div id="whole-TL">
        <div className="buffer bigbang">start buffer</div>
        <div id="uni" className='timeline' style={{ width: compound_width }} ref={tlref}>

          {imgList.map(image =>
          <div className='imagebox' key={image.id} style={{ left: image.timeline + '%' }}>
              <img className="timeline-image" src={image.picture} title={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
            <div className="imagelabel">{image.alt}</div>
            </div>)}
          {segmentsArr.map(segment =>
            <div key={segment.timeago} style={{ left: segment.placement+'%'}} className="time-marker">{typeof segment.timeago === 'number' ? segment.timeago+' billion years ago': segment.timeago}</div>
            )}

        </div>
        <div className="buffer">end buffer</div>
      </div>}
    </main>

    <div className="further-info">
      <h3>Put further info here</h3>
            <button onClick={handleButtonClick}>A</button>
    </div>
       {/* {imgList.length > 0 && <div id="uni" className='timeline' style={{ width: width }} ref={tlref}>
      {imgList.map(image => <div className='imagebox' key={image.id}>
        <img src={image.picture} title={image.alt} draggable='false'></img>
      </div>)}
    </div>} */}
 </>)
})

export default Timeline

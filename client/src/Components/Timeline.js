
// import useMousePosition from "../Hooks/useMousePosition"
// import React, { useRef, useEffect, useState } from "react"
import React, { useState } from "react"
import { forwardRef, useEffect } from "react"

//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({imgList}, tlref)=>{
  // const locateMouse = useMousePosition()
const [counter, setCounter] = useState(0)

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
      let percent = Math.ceil(window.scrollX / document.body.scrollWidth * 100)

      setCounter(Math.ceil(13.8*(window.scrollX/document.body.scrollWidth)))
    };
    window.addEventListener('scroll', handlePageScroll);
    return ()=>{window.removeEventListener('scroll',handlePageScroll)}

  },[])


const width = 2000
const compound_width = imgList? width*segmentsArr.length*2: 0
//console.log(imgList)

  return (<><h1>History of the Universe</h1>
    <h2>Counting Clock: {counter}</h2>
    {imgList.length > 0 &&
      <div id="whole-TL">
        <div className="buffer">start buffer</div>
        <div id="uni" className='timeline' style={{ width: compound_width }} ref={tlref}>

          {imgList.map(image =>
          <div className='imagebox' key={image.id} style={{ left: image.timeline + '%' }}>
            <img src={image.picture} title={image.alt} draggable='false'></img>
            <div className="vertical">{image.alt}</div>
            </div>)}
          {segmentsArr.map(segment =>
            <div key={segment.timeago} style={{ left: segment.placement+'%'}} className="time-marker">{typeof segment.timeago === 'number' ? segment.timeago+' billion years ago': segment.timeago}</div>
            )}

        </div>
        <div className="buffer">end buffer</div>
      </div>}
       {/* {imgList.length > 0 && <div id="uni" className='timeline' style={{ width: width }} ref={tlref}>
      {imgList.map(image => <div className='imagebox' key={image.id}>
        <img src={image.picture} title={image.alt} draggable='false'></img>
      </div>)}
    </div>} */}
 </>)
})

export default Timeline


// import useMousePosition from "../Hooks/useMousePosition"
// import React, { useRef, useEffect, useState } from "react"
import React from "react"
import { forwardRef } from "react"

//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({imgList}, tlref)=>{
  // const locateMouse = useMousePosition()

  const timeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
  // const imgpath = './Assets/'

// const [width, setWidth] = useState(0)
// const ref = useRef(null);

  // useEffect(() => {
  //   setWidth(ref.current.getBoundingClientRect().width)
  // }, []);


const width = 1000
const compound_width = width*timeArr.length
//console.log(imgList)

  return (<>
    {imgList.length > 0 && <div id="uni" className='timeline' style={{ width: compound_width }} ref={tlref}>
      {timeArr.map(timesegment => <div className='imagebox' key={timesegment} style={{ left: imgList[timesegment - 1].timeline + '%' }}>
        <img src={imgList[timesegment - 1].picture} title={imgList[timesegment - 1].alt} draggable='false'></img>
      </div>)}
    </div>}
       {/* {imgList.length > 0 && <div id="uni" className='timeline' style={{ width: width }} ref={tlref}>
      {timeArr.map(timesegment => <div className='imagebox' key={timesegment}>
        <img src={imgList[timesegment - 1].picture} title={imgList[timesegment - 1].alt} draggable='false'></img>
      </div>)}
    </div>} */}
 </>)
})

export default Timeline
//<div className="testitem" style={{left: imgList[6].timeline+'%'}}>Random</div> //this was used for testing placement on timeline using calculated left position
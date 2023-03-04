import React, {useState} from "react"

export default function CustomTimeline({custTL, setCustTL}) {

    // console.log('mycusttl', custTL)
const width = 200
  const compound_width = width * 5//custTL.arrayTL.length
 // const checkArr = custTL.arrayTL || []
 // console.log(checkArr)

  return (<div className="customplaceholder">custom
    {custTL.arrayTL && <div className='cust-timeline' style={{ width: compound_width }}>
      {custTL.arrayTL.map(segment => <div className='cust-imagebox' key={segment}>{segment}
        {/* <img src={imgList[segment - 1].picture} title={imgList[timesegment - 1].alt} draggable='false'></img> */}
      </div>)}
    </div>}
 </div>)
}
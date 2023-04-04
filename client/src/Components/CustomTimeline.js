import React, {useState, forwardRef, useEffect} from "react"
import segmentsArr from '../customsections.json'

const CustomTimeline = forwardRef(({ imgList, setFurtherInfoShown, furtherInfoShown }, tlref) => {

  const imageURL = "http://127.0.0.1:4500/"




  function handleImageClick(event) {
  };

  // console.log('mycusttl', custTL)
  const width = 20
  const compound_width = width * 5//custTL.arrayTL.length
  // const checkArr = custTL.arrayTL || []
  // console.log(checkArr)
  const fullwidth = compound_width + (30)

  return (<div className="customplaceholder">custom
    {imgList.length > 0 &&
      <>
        <div id="custwholeTL" style={{ width: fullwidth + 'vw' }}>
          <div className="cust-buffer">
            {/*SHOULD TRY AND CLEAN UP FIRST IMAGE JSX STRUCTURE*/}
            {/*PUT A MINI DESCRIPTION HERE FOR HOW THE TIMELINE WORKS*/}


          </div>

          <div style={{ width: compound_width + 'vw', top: '-1.5vh', left: '100vw', position: 'absolute' }}>
            {segmentsArr.map(segment =>
              <div key={segment.timeago} style={{ left: segment.placement + '%' }} className="time-marker">{segment.timeago !== 0 ? segment.timeago + ' billion years ago' : 'Now'}</div>
            )}
          </div>

          <div id="my-cust-TL" className='timeline' style={{ width: compound_width + 'vw' }} ref={tlref}>
            {imgList.map(image => image.id > 0 && image.id < imgList.length - 2 &&
              <div className='cust-tl-imagebox' key={image.id} style={{ left: image.timeline + '%', width: image.constraint }}>
                <div className="cust-tl-image-and-tag">
                  <img className="cust-tl-image" src={imageURL + image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
                  <div className="cust-tl-imagetag">{image.alt}</div>
                </div>

              </div>)}
          </div>

          <div className="cust-buffer">

          </div>
        </div>



{/*
        <div className='cust-timeline' style={{ width: compound_width }}>
          {custTL[0].arrayTL.map(segment => <div className='cust-imagebox' key={segment}>{segment}What
            <img src={imgList[segment - 1].picture} className="timeline-image" title={imgList[timesegment - 1].alt} draggable='false'></img>
          </div>)}
        </div> */}
      </>}

  </div>)
});

export default CustomTimeline
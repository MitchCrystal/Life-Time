
// import useMousePosition from "../Hooks/useMousePosition"
import React, { useState, forwardRef, useEffect } from "react"
import { getWikiDetail, getWikiID } from "../Services/ApiClient"
import segmentsArr from '../universeTLsections.json'


//export default function Timeline({ imgList }) {
const Timeline = forwardRef(({ imgList, setFurtherInfoShown, furtherInfoShown }, tlref) => {
  // const locateMouse = useMousePosition()
  const [counter, setCounter] = useState(0);
  const [furtherInfoBox, setFurtherInfoBox] = useState('');
  const [bigBang, setBigBang] = useState(0);
  const [wikiLink, setWikiLink] = useState('');
  const [furtherInfoTitle, setFurtherInfoTitle] = useState('');
  const [furtherInfoPic, setFurtherInfoPic] = useState('');
  const imageURL = "http://127.0.0.1:4500/"

  useEffect(() => {
    function handlePageScroll(event) {
      let currentScroll = window.scrollX / (document.body.scrollWidth - window.innerWidth)
      const maxTime = 13800000000
      let currentTime = Math.ceil(maxTime * currentScroll)
      maxTime <= currentTime ? setCounter(maxTime) : setCounter(currentTime)
    };
    window.addEventListener('scroll', handlePageScroll);
    return () => { window.removeEventListener('scroll', handlePageScroll) }
  }, []);


  async function handleImageClick(event) {
    setFurtherInfoPic(imgList[event.target.dataset.nav].picture);
    setFurtherInfoTitle(event.target.alt);
    await getWikiID(imgList[event.target.dataset.nav].wiki)
      .then(async result => {
        setWikiLink('https://en.wikipedia.org/?curid=' + result.query.search[0].pageid);
        return await getWikiDetail(result.query.search[0].pageid)
      })
      .then(result => setFurtherInfoBox(result.query.pages[0].extract))
    setFurtherInfoShown(true);
  };

  function handleButtonClick(event) {
    setFurtherInfoShown(false);
  };

  function handleLogoClick(event) {
    setBigBang(1);
    setTimeout(() => {
      setBigBang(2)
    }, 5000);
  };

  const width = 430;
  const compound_width = imgList ? width * Math.abs(segmentsArr[segmentsArr.length - 1].timeago - segmentsArr[0].timeago) : 0;
  const fullwidth = compound_width + (200);


  return (
    <>
      {bigBang < 2 &&
        <div id="splash" style={bigBang > 0 ? { animationName: 'hide' } : { animationName: 'none' }}>
          {bigBang < 1 &&
            <>
              <div id="page-title">Life/Time</div>
              <img id='logo' src="/logo.png" onClick={handleLogoClick} draggable='false'></img>
            </>}
          {bigBang === 1 &&
            <div id="singularity"></div>}
          {bigBang < 1 &&
            <span>Click the logo to trigger the Big Bang</span>}
      </div>}

      <div>
        <h2 id="time-counter" className={counter <= 1000000000 || furtherInfoShown === true ? 'hidden' : 'shown'}>{counter.toLocaleString('en-GB')} years since Big Bang</h2>
      </div>

      <main className={furtherInfoShown === true ? 'hidden' : 'shown'}>
        <h1 style={{ marginLeft: '3rem', fontSize: '3rem', marginBottom: '0' }}>History of the Universe</h1>
        {imgList.length > 0 &&
          <>
          <div id="wholeTL" style={{ width: fullwidth + 'vw' }}>
            <div className="buffer">
              {/*SHOULD TRY AND CLEAN UP FIRST IMAGE JSX STRUCTURE*/}
              {/*PUT A MINI DESCRIPTION HERE FOR HOW THE TIMELINE WORKS*/}
              <div id='bigbangimgbox' className='tl-imagebox' key={imgList[0].id} style={{ width: imgList[0].constraint }}>
                <div className="tl-image-and-tag" style={{alignSelf:"center"}}>
                  <img id='bigbangimg' className="tl-image" src={imageURL+imgList[0].picture} title={imgList[0].alt} alt={imgList[0].alt} draggable='false' data-nav={imgList[0].id} onClick={handleImageClick}></img>
                  <div id="intro">
                    <span style={{ fontSize: "1.5rem" }}>The Big Bang occurred 13.8 BILLION years ago.</span><br></br><br></br> That's a difficult length of time to visualise but this timeline is designed to help.<br></br><br></br>
                    Use your arrow keys or the visual scrollbar below to navigate<br></br> and click any image for more information.
                  </div>

                </div>
              </div>

            </div>

            <div style={{ width: compound_width + 'vw', top: '-1.5vh', left: '100vw', position: 'absolute' }}>
            {segmentsArr.map(segment =>
              <div key={segment.timeago} style={{ left: segment.placement + '%' }} className="time-marker">{segment.timeago !== 0 ? segment.timeago + ' billion years ago' : 'Now'}</div>
            )}
            </div>

            <div id="uni" className='timeline' style={{ width: compound_width + 'vw' }} ref={tlref}>
              {imgList.map(image => image.id > 0 && image.id < imgList.length - 2 &&
                <div className='tl-imagebox' key={image.id} style={{ left: image.timeline + '%', width: image.constraint }}>
                  <div className="tl-image-and-tag">
                    <img className="tl-image" src={imageURL+image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
                    <div className="tl-imagetag">{image.alt}</div>
                  </div>
                  {image.comments && image.comments.map((comment, index) =><div key={index} className='comment-holder' style={{ left: comment.position + 'vw' }}>
                    <div className="comment" style={{ left: '45vw'}}>{comment.text}</div></div>)}


                </div>)}
            </div>

            <div className="buffer">
              <div style={{ width: '5vw' }} ></div>
              <div style={{ width: '20vw', marginTop: '5vh' }}><p style={{fontWeight:"700", marginRight: "0", paddingTop: "20px"}}>The final events on the right are so recent that
                they can't even fit on the timeline, despite being thousands of years ago, because their timescale is so tiny!</p></div>
              {imgList.map(image => image.id >= imgList.length - 2 &&
                <div className='tl-imagebox endimgbox' key={image.id} style={{ width: image.constraint }}>
                  <div className="tl-image-and-tag">
                    <img className="tl-image endimg" src={imageURL+image.picture} title={image.alt} alt={image.alt} draggable='false' data-nav={image.id} onClick={handleImageClick}></img>
                    <div className="tl-imagetag">{image.alt}</div>
                  </div>
                  {/*PUT A MINI DESCRIPTION HERE FOR THE LAST TWO EVENTS*/}
                </div>)}
              <div style={{ width: '5vw' }} ></div>
            </div>
          </div>
        </>}
      </main>

      <div className={furtherInfoShown === true ? 'shown further-info' : 'hidden further-info'}>
        <h3>{furtherInfoTitle}</h3>
        <button onClick={handleButtonClick}>Back to timeline <span>↑</span></button>
        <div className="info-text">
          <div><p>{furtherInfoBox}</p>
            <br></br>
            <p style={{ display: "inline" }}>More information at → <a href={wikiLink} target="_blank">Wikipedia</a></p>
          </div>
          <div>
            <img className="furtherinfopic" src={imageURL+furtherInfoPic}></img>
          </div>
        </div>
      </div>
    </>)
});

export default Timeline;

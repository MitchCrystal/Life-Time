import React, { useState, forwardRef, useEffect } from 'react';
import {
  getWikiDetail,
  getWikiID,
  getShorterWikiDetail,
} from '../Services/ApiClient';
import segmentsArr from '../universeTLsections.json';

const Timeline = forwardRef(
  (
    {
      imgList,
      setFurtherInfoShown,
      furtherInfoShown,
      bigBang,
      setBigBang,
      isMobile,
      isPortrait,
    },
    tlref
  ) => {
    const [counter, setCounter] = useState(0);
    const [furtherInfoBox, setFurtherInfoBox] = useState('');

    const [wikiLink, setWikiLink] = useState('');
    const [furtherInfoTitle, setFurtherInfoTitle] = useState('');
    const [furtherInfoPic, setFurtherInfoPic] = useState('');
    const [furtherInfoTime, setFurtherInfoTime] = useState('');

    // const years = 13.8 //this will be customisable for later
    // console.log(Math.round(years%1*10)/10)

    useEffect(() => {
      function handlePageScroll(event) {
        let currentScroll = isPortrait
          ? window.scrollY / (document.body.scrollHeight - window.innerHeight)
          : window.scrollX / (document.body.scrollWidth - window.innerWidth);
        const maxTime = 13800000000;
        let currentTime = Math.ceil(maxTime * currentScroll);
        maxTime <= currentTime ? setCounter(maxTime) : setCounter(currentTime);
      }
      window.addEventListener('scroll', handlePageScroll);
      return () => {
        window.removeEventListener('scroll', handlePageScroll);
      };
    }, [isPortrait]);

    async function handleImageClick(event) {
      setFurtherInfoPic(imgList[event.target.dataset.nav].picture);
      setFurtherInfoTitle(event.target.alt);
      const timeAgo =
        (1 - imgList[event.target.dataset.nav].timeline / 100) * 13.8;
      if (timeAgo < 0.0001) {
        setFurtherInfoTime('5,000');
      } else if (timeAgo < 0.001) {
        setFurtherInfoTime(Math.round(timeAgo * 10000) * 100 + ',000');
      } else if (timeAgo < 1) {
        setFurtherInfoTime(Math.round(timeAgo * 1000) + ' million');
      } else {
        setFurtherInfoTime(Math.round(timeAgo * 10) / 10 + ' billion');
      }
      await getWikiID(imgList[event.target.dataset.nav].wiki)
        .then(async (result) => {
          setWikiLink(
            'https://en.wikipedia.org/?curid=' + result.query.search[0].pageid
          );
          if (isMobile)
            return await getShorterWikiDetail(result.query.search[0].pageid);
          else {
            return await getWikiDetail(result.query.search[0].pageid);
          }
        })
        .then((result) => setFurtherInfoBox(result.query.pages[0].extract));
      setFurtherInfoShown(true);
    }

    function handleButtonClick(event) {
      setFurtherInfoShown(false);
    }

    function handleBackToStartClick() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    function handleLogoClick(event) {
      setBigBang(1);
      setTimeout(() => {
        setBigBang(2);
      }, 5000);
    }

    const width = 430;
    const compound_width = imgList
      ? width *
        Math.abs(
          segmentsArr[segmentsArr.length - 1].timeago - segmentsArr[0].timeago
        )
      : 0;
    const fullwidth = compound_width + 200;

    return (
      <>
        {bigBang < 2 && (
          <div
            id="splash"
            style={
              bigBang > 0
                ? { animationName: 'hide' }
                : { animationName: 'none' }
            }
          >
            {bigBang < 1 && (
              <>
                <div id="page-title">Life/Time</div>
                <img
                  id="logo"
                  src="/logo.png"
                  onClick={handleLogoClick}
                  draggable="false"
                  alt="Life Time logo"
                ></img>
              </>
            )}
            {bigBang === 1 && <div id="singularity"></div>}
            {bigBang < 1 && (
              <span id="cta">
                {isMobile ? 'Tap' : 'Click'} the logo to trigger the Big Bang
              </span>
            )}
          </div>
        )}

        <div>
          <h2
            id="time-counter"
            className={
              counter <= 1000000000 || furtherInfoShown === true
                ? 'hidden'
                : 'shown'
            }
          >
            {counter.toLocaleString('en-GB')} years since Big Bang
          </h2>
        </div>

        <main className={furtherInfoShown === true ? 'hidden' : 'shown'}>
          <h1 id="timeline-title">The History of the Universe</h1>

          {imgList.length > 0 && (
            <>
              <div
                id="wholeTL"
                style={
                  isPortrait
                    ? { height: fullwidth + 'vh' }
                    : { width: fullwidth + 'vw' }
                }
              >
                <div className="buffer">
                  <div
                    id="bigbangimgbox"
                    className="tl-imagebox"
                    key={imgList[0].id}
                    style={
                      isPortrait
                        ? { height: imgList[0].constraint + 'vh' }
                        : { width: imgList[0].constraint + 'vw' }
                    }
                  >
                    <div
                      id="bigbangimg-and-tag"
                      className="tl-image-and-tag"
                      style={{ alignSelf: 'center' }}
                    >
                      <img
                        id="bigbangimg"
                        className="tl-image"
                        src={'./' + imgList[0].picture}
                        title={imgList[0].alt}
                        alt={imgList[0].alt}
                        draggable="false"
                        data-nav={imgList[0].id}
                        onClick={handleImageClick}
                      ></img>
                      <div id="intro">
                        <span
                          style={
                            isMobile
                              ? { fontSize: '1.3rem' }
                              : { fontSize: '1.5rem' }
                          }
                        >
                          The Big Bang occurred 13.8{' '}
                          <span
                            style={
                              isMobile
                                ? {
                                    fontSize: '1.3rem',
                                    textDecoration: 'wavy underline',
                                  }
                                : {
                                    fontSize: '1.5rem',
                                    textDecoration: 'wavy underline',
                                  }
                            }
                          >
                            billion
                          </span>{' '}
                          years ago.
                        </span>
                        <br></br>
                        <br></br> That's a difficult length of time to visualise
                        but this timeline is designed to help.<br></br>
                        <br></br>
                        {isMobile
                          ? 'Scroll'
                          : 'Use your arrow keys or the visual scrollbar below'}{' '}
                        to navigate{!isMobile && <br></br>} and{' '}
                        {isMobile ? 'tap' : 'click'} any image (including this
                        one) for more info.
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={
                    isPortrait
                      ? {
                          height: compound_width + 'vh',
                          top: '100vh',
                          left: '-1.5vw',
                          position: 'absolute',
                        }
                      : {
                          width: compound_width + 'vw',
                          top: '-1.5vh',
                          left: '100vw',
                          position: 'absolute',
                        }
                  }
                >
                  {segmentsArr.map((segment) => (
                    <div
                      key={segment.timeago}
                      style={
                        isPortrait
                          ? { top: segment.placement + '%' }
                          : { left: segment.placement + '%' }
                      }
                      className="time-marker"
                    >
                      {segment.timeago !== 0
                        ? segment.timeago + ' billion years ago'
                        : 'Now'}
                    </div>
                  ))}
                </div>

                <div
                  id="uni"
                  className="timeline"
                  style={
                    isPortrait
                      ? { height: compound_width + 'vh' }
                      : { width: compound_width + 'vw' }
                  }
                  ref={tlref}
                >
                  {imgList.map(
                    (image) =>
                      image.id > 0 &&
                      image.id < imgList.length - 2 && (
                        <div
                          className="tl-imagebox"
                          key={image.id}
                          style={
                            isPortrait
                              ? {
                                  top: image.timeline + '%',
                                  height: image.constraint + 'vh',
                                }
                              : {
                                  left: image.timeline + '%',
                                  width: image.constraint + 'vw',
                                }
                          }
                        >
                          <div className="tl-image-and-tag">
                            <img
                              className="tl-image"
                              src={'./' + image.picture}
                              title={image.alt}
                              alt={image.alt}
                              draggable="false"
                              data-nav={image.id}
                              onClick={handleImageClick}
                            ></img>
                            <div className="tl-imagetag">{image.alt}</div>
                          </div>
                          {image.comments &&
                            image.comments.map((comment, index) => (
                              <div
                                key={index}
                                className="comment-holder"
                                style={
                                  isPortrait
                                    ? { top: comment.position + 'vh' }
                                    : { left: comment.position + 'vw' }
                                }
                              >
                                <div
                                  className="comment"
                                  style={
                                    isPortrait
                                      ? { top: '40vh' }
                                      : { left: '45vw' }
                                  }
                                >
                                  {comment.text}
                                </div>
                              </div>
                            ))}
                        </div>
                      )
                  )}
                </div>

                <div className="buffer">
                  <div
                    id="finalcomment-box"
                    style={
                      isPortrait
                        ? { height: '10vh' }
                        : { width: '75%', marginTop: '0vh' }
                    }
                  >
                    <p
                      id="finalcomment-p"
                      style={{
                        fontWeight: '700',
                        marginRight: '0',
                        paddingTop: '20px',
                      }}
                    >
                      These final two events are so recent that they can't even
                      fit on the timeline, despite being thousands of years ago,
                      because they are so tiny against the timescale!
                    </p>
                  </div>
                  <div id="final-main">
                    <div id="final-images-and-comments">
                      <div id="final-images">
                        {imgList.map(
                          (image) =>
                            image.id >= imgList.length - 2 && (
                              <div
                                className="tl-imagebox endimgbox"
                                key={image.id}
                                style={
                                  isPortrait
                                    ? { height: +image.constraint + 10 + 'vh' }
                                    : { width: image.constraint + 'vw' }
                                }
                              >
                                <div className="tl-image-and-tag">
                                  <img
                                    className="tl-image endimg"
                                    src={'./' + image.picture}
                                    title={image.alt}
                                    alt={image.alt}
                                    draggable="false"
                                    data-nav={image.id}
                                    onClick={handleImageClick}
                                  ></img>
                                  <div className="tl-imagetag">{image.alt}</div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                      <div id="final-image-comments">
                        <div
                          style={
                            isPortrait
                              ? {
                                  height: '5vh',
                                  width: '35vw',
                                  fontSize: '0.8rem',
                                }
                              : {
                                  height: '10vh',
                                  width: '20vw',
                                }
                          }
                        >
                          The first modern humans appeared around 200,000 years
                          ago, which is less than a pixel on this scale!
                        </div>
                        <div
                          style={
                            isPortrait
                              ? {
                                  height: '5vh',
                                  width: '35vw',
                                  fontSize: '0.8rem',
                                }
                              : {
                                  height: '10vh',
                                  width: '20vw',
                                }
                          }
                        >
                          Stonehenge was built around 5,000 years ago, about the
                          same time as the first Egyptian pyramids.
                        </div>
                      </div>
                    </div>
                    <button id="backToStart" onClick={handleBackToStartClick}>
                      {isMobile ? 'Tap' : 'Click'} here to go back to the start
                    </button>
                  </div>
                  {/* <div style={{ width: '5vw' }}></div> */}
                </div>
              </div>
            </>
          )}
        </main>

        <div
          className={
            furtherInfoShown === true
              ? 'shown further-info'
              : 'hidden further-info'
          }
        >
          {isPortrait ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div id="titleAndTime">
                <h3>{furtherInfoTitle}</h3>
                <aside>(Approx. {furtherInfoTime} years ago)</aside>
              </div>
              {furtherInfoPic && (
                <>
                  <img
                    className="furtherinfopic"
                    src={'./' + furtherInfoPic}
                    alt="further info"
                  ></img>
                  <div id="info-text">
                    <p id="main-info-text">{furtherInfoBox}</p>
                  </div>
                </>
              )}
              <p className="link-text" style={{ display: 'inline' }}>
                (More information at →{' '}
                <a href={wikiLink} target="_blank" rel="noreferrer">
                  Wikipedia)
                </a>
              </p>
              <button
                style={{ position: 'relative' }}
                onClick={handleButtonClick}
              >
                <span className="arrow">←</span> Back to timeline
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5vmin',
                justifyContent: 'center',
              }}
            >
              <div className="info-title-text-link">
                <div id="titleAndTime">
                  <h3>{furtherInfoTitle}</h3>{' '}
                  <aside>(Approx. {furtherInfoTime} years ago)</aside>
                </div>
                <button
                  style={{ position: 'relative' }}
                  onClick={handleButtonClick}
                >
                  Back to timeline <span>↑</span>
                </button>
              </div>
              <div id="info-text">
                <p id="main-info-text">{furtherInfoBox}</p>
                {furtherInfoPic && (
                  <div>
                    <img
                      className="furtherinfopic"
                      src={'./' + furtherInfoPic}
                      alt="further info"
                    ></img>
                  </div>
                )}
              </div>
              <p className="link-text" style={{ display: 'inline' }}>
                (More information at →{' '}
                <a href={wikiLink} target="_blank" rel="noreferrer">
                  Wikipedia)
                </a>
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default Timeline;

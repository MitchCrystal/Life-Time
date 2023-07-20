import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import * as ApiClient from './Services/ApiClient';
// import useMousePosition from './Hooks/useMousePosition';
import Timeline from './Components/Timeline';

function App() {
  const [imgList, setImageList] = useState([]);
  const [position, setPosition] = useState(0);
  const [miniMapScroll, setMiniMapScroll] = useState('0%');
  const [furtherInfoShown, setFurtherInfoShown] = useState(false);
  const [bigBang, setBigBang] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    function detectPortrait() {
      if (window.innerWidth < window.innerHeight) {
        setIsPortrait(true);
      }
      else { setIsPortrait(false) }
    }

    window.addEventListener('resize', () => {
    detectPortrait();
  });
  }, []);

  // const locateMouse = useMousePosition();
  // const leftRightEdge = (locateMouse.x / window.innerWidth) * 100;
  // const topBottomEdge = (locateMouse.y / window.innerHeight) * 100;

  // if (
  //   leftRightEdge < 10 &&
  //   topBottomEdge < 75 &&
  //   topBottomEdge > 15 &&
  //   !furtherInfoShown &&
  //   bigBang === 2
  // ) {
  //   window.scrollTo({ top: 0, left: window.scrollX - window.innerWidth / 200 });
  // }
  // if (
  //   leftRightEdge > 90 &&
  //   topBottomEdge < 75 &&
  //   topBottomEdge > 15 &&
  //   !furtherInfoShown &&
  //   bigBang === 2
  // ) {
  //   window.scrollTo({ top: 0, left: window.scrollX + window.innerWidth / 200 });
  // }

  const tlref = useRef(null);
  const miniMapRef = useRef(null);
  const miniMapRangeRef = useRef(null);

  useEffect(() => {
    ApiClient.getImageList().then((result) => setImageList(result));
  }, []);

  function handleMiniScroll(event) {
    window.scrollTo({
      top: 0,
      left:
        (tlref.current.offsetWidth + window.innerWidth) *
        (event.target.value / 100),
      behavior: 'smooth',
    });
    setPosition(event.target.value);
  }

  useEffect(() => {
    if (!isMobile) {
      function handlePageScroll(event) {
        let currentScroll =
          window.scrollX / (document.body.scrollWidth - window.innerWidth);
        let miniMapPercent = currentScroll * 100;
        100 <= miniMapPercent
          ? setMiniMapScroll('100%')
          : setMiniMapScroll(miniMapPercent + '%');
      }
      window.addEventListener('scroll', handlePageScroll);
      return () => {
        window.removeEventListener('scroll', handlePageScroll);
      };
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      function handlePageScroll(event) {
        setPosition((window.scrollX / document.body.scrollWidth) * 100);
      }
      window.addEventListener('scroll', handlePageScroll);
      return () => {
        window.removeEventListener('scroll', handlePageScroll);
      };
    }
  }, [isMobile]);

  return (
    <div className="App">
      <header className="App-header"></header>
      {(isMobile && !isPortrait) ? (<div style={{textAlign: "center", position: 'relative', top: "45vh"}}>Please hold your device in a portrait orientation</div>) :
        <Timeline
          imgList={imgList}
          ref={tlref}
          furtherInfoShown={furtherInfoShown}
          setFurtherInfoShown={setFurtherInfoShown}
          bigBang={bigBang}
          setBigBang={setBigBang}
          isMobile={isMobile}
          isPortrait={isPortrait}
        />}
      {isMobile ? (
        !furtherInfoShown ? (
          <div id="scrollindicator">
            {isPortrait ? "↓" : ""}
          </div>
        ) : (
          <></>
        )
      ) : (
        <div
          id="minimap"
          className={
            furtherInfoShown === true
              ? 'hidden minitimeline'
              : 'shown minitimeline'
          }
          ref={miniMapRef}
          style={{ backgroundPosition: miniMapScroll }}
        >
          <label htmlFor="minimap-range"></label>
          <input
            id="minimap-range"
            type="range"
            ref={miniMapRangeRef}
            value={position}
            max="100"
            onChange={handleMiniScroll}
          ></input>

          <div
            id="scrollindicator"
            style={
              position > 3 || furtherInfoShown === true
                ? { display: 'none' }
                : { display: 'block' }
            }
          >
            →
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

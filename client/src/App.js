import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import * as ApiClient from './Services/ApiClient';
import useMousePosition from './Hooks/useMousePosition';
import Timeline from './Components/Timeline';
import CreateTL from './Components/CreateTL';

function App() {

  const [custTL, setCustTL] = useState({});
  const [imgList, setImageList] = useState([]);
  const [position, setPosition] = useState(0);
  const [miniMapScroll, setMiniMapScroll] = useState('0%');
  const [furtherInfoShown, setFurtherInfoShown] = useState(false);
    const [bigBang, setBigBang] = useState(0);

  const locateMouse = useMousePosition()
  const leftRightEdge = locateMouse.x / window.innerWidth * 100
  const topBottomEdge = locateMouse.y / window.innerHeight * 100
console.log(!furtherInfoShown)
  if (leftRightEdge < 10 && topBottomEdge < 75 && topBottomEdge > 15 && !furtherInfoShown && bigBang===2) {
    window.scrollTo({top:0, left: window.scrollX - (window.innerWidth/200)})
  }
  if (leftRightEdge > 90 && topBottomEdge < 75 && topBottomEdge > 15 && !furtherInfoShown && bigBang===2) {
    window.scrollTo({top:0, left: window.scrollX + (window.innerWidth/200)})
  }

  const tlref = useRef(null);
  const miniMapRef = useRef(null);
  const miniMapRangeRef = useRef(null);

  useEffect(() => {
    ApiClient.getImageList()
      .then(result => setImageList(result))
  }, []);


  function handleMiniScroll(event) {
       window.scrollTo({top: 0, left: ((tlref.current.offsetWidth+window.innerWidth) * (event.target.value / 100)), behavior:'smooth'})
    setPosition(event.target.value)
  };


  useEffect(() => {
    function handlePageScroll(event) {
      let currentScroll = window.scrollX / (document.body.scrollWidth - window.innerWidth)
      let miniMapPercent = (currentScroll * 100)
      100 <= miniMapPercent ? setMiniMapScroll('100%') : setMiniMapScroll(miniMapPercent + '%')
    };
    window.addEventListener('scroll', handlePageScroll);
    return () => { window.removeEventListener('scroll', handlePageScroll) }

  }, []);


  useEffect(() => {
    function handlePageScroll(event) {
       setPosition(window.scrollX/document.body.scrollWidth*100)
    };
    window.addEventListener('scroll', handlePageScroll);
    return ()=>{window.removeEventListener('scroll',handlePageScroll)}
  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <Timeline imgList={imgList} ref={tlref} furtherInfoShown={furtherInfoShown} setFurtherInfoShown={setFurtherInfoShown} bigBang={bigBang} setBigBang={setBigBang} />
      <div id="minimap" className={furtherInfoShown === true ? 'hidden minitimeline' : 'shown minitimeline'} ref={miniMapRef} style={{ backgroundPosition: miniMapScroll }}>
        <input id="minimap-range" type="range" ref={miniMapRangeRef} value={position} max="100" onChange={handleMiniScroll}></input>
        <div id="scrollindicator" style={position > 3 || furtherInfoShown === true ? { display: 'none' } : {display: 'block'}}>→</div>
      </div>
    </div>
  );
};

export default App;

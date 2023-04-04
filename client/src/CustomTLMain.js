import React, { useEffect, useState, useRef } from 'react';
import './CustomTLMain.css';
import CreateTL from './Components/CreateTL';
import CustomTimeline from './Components/CustomTimeline';
import * as ApiClient from './Services/ApiClient'


function CustomTLMain() {

  const [custTL, setCustTL] = useState([]);
  const [position, setPosition] = useState(0);
  const [miniMapScroll, setMiniMapScroll] = useState('0%');
  const [furtherInfoShown, setFurtherInfoShown] = useState(false);
  const [custCreated, setCustCreated] = useState()
const [imgList, setImageList] = useState([]);

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

  function handleBurgerClick(event) {

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


  return (
    <div>
      <header className="CustomTL-header">
      </header>
      <div id="burgermenu" className={furtherInfoShown === true ? 'hidden' : 'shown'} onClick={handleBurgerClick}>
        <div className='burgerline'></div>
        <div className='burgerline'></div>
        <div className='burgerline'></div>
      </div>
      {!custCreated && <CreateTL setCustTL={setCustTL} setCustCreated={setCustCreated } />}

      {custCreated &&
        <>
        <CustomTimeline custTL={custTL} imgList={imgList} setCustTL={setCustTL} tlref={tlref} />
        <div id="minimap" className={furtherInfoShown === true ? 'hidden minitimeline' : 'shown minitimeline'} ref={miniMapRef} style={{ backgroundPosition: miniMapScroll }}>
        <input id="minimap-range" type="range" ref={miniMapRangeRef} value={position} max="100" onChange={handleMiniScroll}></input>
        <div id="scrollindicator" style={position > 3 || furtherInfoShown === true ? { display: 'none' } : {display: 'block'}}>→</div>
      </div>
      </>}
    </div>
  );
};

export default CustomTLMain;

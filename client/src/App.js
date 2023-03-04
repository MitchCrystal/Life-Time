import React, { useEffect, useState, useRef } from 'react'
import './App.css';
import * as ApiClient from './Services/ApiClient'
// import useMousePosition from './Hooks/useMousePosition';
import Timeline from './Components/Timeline';
import CreateTL from './Components/CreateTL';
//import CustomTimeline from './Components/CustomTimeline';

function App() {

  const [custTL, setCustTL] = useState({})
  const [imgList, setImageList] = useState([])
  const [position, setPosition] = useState(0)
  // const imgpath = './Assets/'
  // const locateMouse = useMousePosition()

  const tlref = useRef(null);
  const miniMapRef = useRef(null);
  const miniMapRangeRef = useRef(null);

  // const [bigTLWidth, setBigTLWidth] = useState(0);
  // const [miniTLWidth, setMiniTLWidth] = useState(0);
  // const [miniTLRangeWidth, setMiniTLRangeWidth] = useState(0);

  // useEffect(() => {
  //   if (tlref.current) {
  //     setBigTLWidth(tlref.current.offsetWidth);
  //     //console.log(bigTLWidth)
  //   }
  //   // if (miniMapRef.current) {
  //   //   setMiniTLWidth(miniMapRef.current.offsetWidth);
  //   //   //console.log(miniTLWidth)
  // //  }
  // }, [tlref.current/*, miniMapRef.current*/]);



  useEffect(() => {
    ApiClient.getImageList()
    .then(result => setImageList(result))
  }, [])


  function handleMiniScroll(event) {
       window.scrollTo({top: 0, left: ((tlref.current.offsetWidth+window.innerWidth) * (event.target.value / 100)), behavior:'smooth'})
    setPosition(event.target.value)
  }


  // useEffect(() => {
  //   function handlePageScroll(event) {
  //     // console.log(window.scrollX)
  //     // console.log(document.body.scrollWidth)
  //     // console.log(window.scrollX/document.body.scrollWidth*100)
  //     setPosition(window.scrollX/document.body.scrollWidth*100)
  //   };
  //   window.addEventListener('scroll', handlePageScroll);
  //   return ()=>{window.removeEventListener('scroll',handlePageScroll)}

  // },[])


  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <div>{bigTLWidth} just marking bigtimeline width</div> */}
      <CreateTL custTL={custTL} setCustTL={setCustTL }  />
      <Timeline imgList={imgList} ref={tlref}  />
      <div id="minimap" className='minitimeline' ref={miniMapRef}>
        <input id="minimap-range" type="range" ref={miniMapRangeRef} value={position} max="100" onChange={handleMiniScroll}></input>
      </div>
      {/* <CustomTimeline custTL={custTL} setCustTL={setCustTL } /> */}
    </div>
  );
}

export default App;

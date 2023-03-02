import React, { useEffect, useState } from 'react'
import './App.css';
import * as ApiClient from './Services/ApiClient'
// import useMousePosition from './Hooks/useMousePosition';
import Timeline from './Components/Timeline';


function App() {


  const [imgList, setImageList] = useState([])
  // const imgpath = './Assets/'
  // const locateMouse = useMousePosition()

  useEffect(() => {
    ApiClient.getImageList()
    .then(result => setImageList(result))
  }, [])


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Timeline imgList={imgList} />
      <div className='minitimeline'>minitimeline</div>
    </div>
  );
}

export default App;

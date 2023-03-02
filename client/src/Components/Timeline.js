
import useMousePosition from "../Hooks/useMousePosition"

export default function Timeline({ imgList }) {

    const locateMouse = useMousePosition()

  return (<div className='timeline'>{locateMouse.x}
    {imgList.map(image => <div className='imagebox' key={image} draggable='false'></div>)}
  </div>
 )
}
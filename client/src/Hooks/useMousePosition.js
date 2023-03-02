import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setOnMouseMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', setOnMouseMove);

    return () => {
      window.removeEventListener('mousemove', setOnMouseMove);
    };
  }, []);
  return position
};

export default useMousePosition
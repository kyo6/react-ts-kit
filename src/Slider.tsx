import React, {useState, useEffect } from "react";


function useInterval(callback: Function, interval: number) {
  useEffect(() => {
    const start = new Date().getTime();
    const I = setInterval(() => {
      callback(new Date().getTime() - start)
    }, interval)
    return () => clearInterval(I)
  },[])
}

function useSlider(N: number, duration = 3000) {
  const [slider, setSlider] = useState(0)
  useInterval((diff: number) => {
    setSlider(() => Math.floor(diff / duration) % N);
  }, 300)
  return slider
}

const imgs: string[] = [
  "https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react-1024x576.png",
  "https://tse1-mm.cn.bing.net/th/id/OIP.j73Ls1RDHl7GxILVpi9xPwHaFA?pid=Api&rs=1",
  "https://www.bacancytechnology.com/blog/wp-content/uploads/2017/09/react_native.png",
];

export default function Slider() {
  const slider = useSlider(imgs.length)
  return (
    <div className="slider">
      <div className="inner" style={{ width: `${imgs.length * 100}%`, transform:`translateX(-${100 * slider / imgs.length}%)` }}>
        {imgs.map((url) => (
          <img key={url} src={url} alt="" />
        ))}
      </div>
    </div>
  );
}

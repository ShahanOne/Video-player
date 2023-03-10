import { useState } from 'react';
import './App.css';

function VideoCard(props) {
  //   const [imgLoad, setLoad] = useState(false);
  const [heart, setHeart] = useState('♡');

  //   function handleError() {
  //     setLoad(true);
  //   }
  function handleHeart() {
    if (heart === '♡') {
      setHeart('❤️');
    } else if (heart === '❤️') {
      setHeart('♡');
    }
  }

  return (
    <div className="shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[#ffffff] sm:w-[16rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 sm:hover:-translate-y-2 hover:transition-transform">
      {/* {!imgLoad ? (
        <img
          className="h-[9rem] sm:h-[12rem] w-full shadow-[0_8px_40px_rgb(0,0,0,0.12)] rounded-t-lg rounded-b-lg"
          onError={handleError}
          src={props.itemImgUrl}
          alt="item-img"
        />
      ) : (
      )} */}

      <img
        className="h-[9rem] sm:h-[12rem] mb-4 w-full shadow-[0_8px_40px_rgb(0,0,0,0.12)] rounded-lg"
        src="/vid.jpg"
        alt="item-img"
      />
      <a
        href={props.videoUrl}
        className="text-lg font-sans font-semibold hover:text-red-400"
      >
        Watch video ▶️
      </a>
      <p className="text-md sm:text-xl sm:mb-2"> {props.videoTitle}</p>

      <div className="p-2">
        <button
          type="button"
          onClick={() => handleHeart() && props.onLike()}
          className="bg-[#faf6ff] w-[50%] shadow-md hover:bg-[#ffffff] text-slate-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Like {heart}
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

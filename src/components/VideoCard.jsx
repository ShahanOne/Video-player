import { useState } from 'react';
import './App.css';
import YouTubePlayer from './YoutubePlayer';

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
    <div className="shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[#ffffff] sm:w-[16rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 py-2 sm:hover:-translate-y-2 hover:transition-transform">
      <YouTubePlayer videoUrl={props.videoUrl} />
      {/* <iframe width="420" height="315" src={props.videoUrl}></iframe> */}
      {/* <video width="320" height="240" controls>
        <source src={props.videoUrl} type="video/webm" />
        Your browser does not support the video tag.
      </video> */}

      <p className="text-md sm:text-xl sm:mb-2"> {props.videoTitle}</p>
      <a
        href={props.videoUrl}
        className="text-lg font-sans font-semibold hover:text-red-400"
      >
        Watch on Youtube▶️
      </a>
      <div className="p-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleHeart() && props.onLike()}
          className="bg-[#fef5ec] shadow-md hover:bg-[#ffffff] text-slate-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Like {heart}
        </button>
        <button
          type="button"
          onClick={() => props.onComment()}
          className="bg-[#fef5ec] shadow-md hover:bg-[#ffffff] text-slate-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Comment 💬
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

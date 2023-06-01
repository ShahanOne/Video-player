import { useEffect, useState } from 'react';
import './App.css';
// import YouTubePlayer from './YoutubePlayer';
import YouTube from 'react-youtube';

function VideoCard(props) {
  const [heart, setHeart] = useState('♡');
  const [height, setHeight] = useState('180');
  const [width, setWidth] = useState('248');
  const [swidth, setSwidth] = useState(window.innerWidth);

  let videoCode;
  props.videoUrl
    ? (videoCode = props.videoUrl.split('v=')[1].split('&')[0])
    : console.log();

  const opts = {
    height: height,
    width: width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  useEffect(() => {
    if (window.innerWidth < 760) {
      console.log('small');
      setWidth('205');
    } else if (window.innerWidth >= 760 && window.innerWidth < 1445) {
      console.log('big');
      setWidth('249');
    } else {
      console.log('bruh');
    }
  }, []);

  function handleHeart() {
    if (heart === '♡') {
      setHeart('❤️');
    } else if (heart === '❤️') {
      setHeart('♡');
    }
  }
  return (
    <div className="shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[#485050] sm:w-[16rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 py-2 sm:hover:-translate-y-2 hover:transition-transform">
      <YouTube
        className=""
        videoId={videoCode}
        containerClassName="embed embed-youtube"
        opts={opts}
      />

      <p className="text-md sm:text-xl sm:mb-2 text-gray-300">
        {' '}
        {props.videoTitle}
      </p>
      <a
        href={props.videoUrl}
        className="text-sm md:text-lg font-sans font-semibold text-slate-300 hover:text-slate-400"
      >
        Watch on Youtube▶️
      </a>
      <div className="p-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => props.onLike() && handleHeart()}
          className="bg-[#6f7272] shadow-md hover:bg-[#2C3333] text-slate-200 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Like {heart}
        </button>
        <button
          type="button"
          onClick={() => props.onComment()}
          className="bg-[#6f7272] shadow-md hover:bg-[#2C3333] text-slate-200 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

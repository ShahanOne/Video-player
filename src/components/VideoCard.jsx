import { useState } from 'react';
import './App.css';
// import YouTubePlayer from './YoutubePlayer';
import YouTube from 'react-youtube';

function VideoCard(props) {
  const [heart, setHeart] = useState('♡');
  const [bubble, setBubble] = useState('💬');

  let videoCode;
  props.videoUrl
    ? (videoCode = props.videoUrl.split('v=')[1].split('&')[0])
    : console.log();

  const opts = {
    height: '220',
    width: '250',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  function handleHeart() {
    if (heart === '♡') {
      setHeart('❤️');
    } else if (heart === '❤️') {
      setHeart('♡');
    }
  }
  function handleBubble() {
    if (bubble === '💬') {
      setBubble('🗨️');
    } else if (bubble === '🗨️') {
      setBubble('💬');
    }
  }
  return (
    <div className="shadow-[0_10px_30px_rgba(140, 82, 255, 0.9)] bg-[#ffffff] sm:w-[16rem] mx-2 sm:mx-4 my-8 text-center rounded-lg px-1 py-2 sm:hover:-translate-y-2 hover:transition-transform">
      <YouTube
        className=""
        videoId={videoCode}
        containerClassName="embed embed-youtube"
        // onStateChange={(e) => checkElapsedTime(e)}
        opts={opts}
      />

      <p className="text-md sm:text-xl sm:mb-2"> {props.videoTitle}</p>
      <a
        href={props.videoUrl}
        className="text-lg font-sans font-semibold hover:text-pink-400"
      >
        Watch on Youtube▶️
      </a>
      <div className="p-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => props.onLike() && handleHeart()}
          className="bg-[#fef5ec] shadow-md hover:bg-[#ffffff] text-orange-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Like {heart}
        </button>
        <button
          type="button"
          onClick={() => props.onComment() && handleBubble()}
          className="bg-[#fef5ec] shadow-md hover:bg-[#ffffff] text-orange-600 active:translate-y-1 text-xs sm:text-base py-3 rounded-2xl border-none"
        >
          Comment {bubble}
        </button>
      </div>
    </div>
  );
}

export default VideoCard;

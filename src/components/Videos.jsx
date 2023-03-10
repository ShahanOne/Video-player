import { useState, useEffect } from 'react';
import SkeletonCard from './SkeletonCard';
import VideoCard from './VideoCard';

function Items(props) {
  const [videoInfo, setVideoInfo] = useState('');

  useEffect(() => {
    async function getVideosInfo() {
      await fetch('http://localhost:3001/api')
        .then((res) => res.json())
        .then((data) => setVideoInfo(data));

      // .then((data) => console.log(data));
    }

    getVideosInfo();
  }, []);

  //   console.log(videoInfo);
  return (
    <>
      {videoInfo ? (
        <div className="bg-[#ECF2FF] px-2 md:px-28 lg:px-36 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          {videoInfo.map((video, index) => (
            <VideoCard
              key={index}
              videoTitle={video.title}
              videoUrl={video.videoUrl}
              onLike={() => props.onLike(video)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-violet-100 to-pink-100 px-2 md:px-28 lg:px-40 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      )}
    </>
  );
}

export default Items;

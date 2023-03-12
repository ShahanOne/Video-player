import { useState, useEffect } from 'react';
import SkeletonCard from './SkeletonCard';
import VideoCard from './VideoCard';

function Items(props) {
  const [videoInfo, setVideoInfo] = useState('');

  useEffect(() => {
    async function getVideosInfo() {
      await fetch(
        'https://nocors.cyclic.app/https://videoplayaserver.cyclic.app/api'
      )
        .then((res) => res.json())
        .then((data) => setVideoInfo(data));

      // .then((data) => console.log(data));
    }

    getVideosInfo();
  }, [props.seed]);

  //   console.log(videoInfo);
  return (
    <>
      {videoInfo ? (
        <div className="bg-[#2C3333] px-2 md:px-28 lg:px-36 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          {videoInfo.map((video, index) => (
            <VideoCard
              key={index}
              videoTitle={video.title}
              videoUrl={video.videoUrl}
              onLike={() => props.onLike(video)}
              onComment={() => props.onComment(video)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-red-100 to-orange-100 px-2 md:px-28 lg:px-40 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          <SkeletonCard /> <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
        </div>
      )}
    </>
  );
}

export default Items;

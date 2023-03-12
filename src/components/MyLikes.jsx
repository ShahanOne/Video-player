import VideoCard from './VideoCard';

function MyLikes(props) {
  return (
    <div className="myLikesDiv px-12 py-24">
      <p className="text-2xl">My Likes :-</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {props.likes?.length ? (
          props.likes.map((video, index) => (
            <VideoCard
              key={index}
              videoTitle={video.title}
              videoUrl={video.videoUrl}
              onLike={() => props.onLike(video)}
              onComment={() => props.onComment(video)}
            />
          ))
        ) : (
          <p
            className="noDataText 
          m-[5%_2%]"
          >
            No Liked Videos!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyLikes;

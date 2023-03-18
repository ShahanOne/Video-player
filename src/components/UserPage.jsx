import Navbar from './Navbar';
import Videos from './Videos';
import UploadNewVideo from './UploadVideo';
import MyLikes from './MyLikes';
import { useState } from 'react';
import YouTube from 'react-youtube';
import Footer from './Footer';

function UserPage(props) {
  const [isUploadClicked, setUploadClick] = useState(false);
  const [isMyLikesClicked, setMyLikesClick] = useState(false);
  const [focusedVideo, setFocusedVideo] = useState();
  const [seed, setSeed] = useState(1);
  const [newComment, setComment] = useState('');

  function handleHome() {
    setMyLikesClick(false);
    setUploadClick(false);
  }
  function handleNewVideo() {
    setUploadClick(true);
    setMyLikesClick(false);
  }
  function handleMyLikes() {
    setMyLikesClick(true);
    setUploadClick(false);
  }
  function handleSignOut() {
    // window.location.reload();
    props.handleSignOut();
  }
  function handleRerender() {
    setSeed(Math.random());
    setUploadClick(false);
    setMyLikesClick(false);
  }

  //Add to Likes
  async function handlelike(video) {
    try {
      const res = await fetch('https://videoplayaserver.cyclic.app/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: props.userId,
            videoId: video._id,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && props.newUserData(data));
    } catch (err) {
      console.log(err);
    }
  }

  function newData(data) {
    props.newUserData(data);
  }

  //comment
  function handleCommentClick(video) {
    // console.log(video);
    setFocusedVideo(video);
  }
  function handleCommentChange(e) {
    const { value } = e.target;
    setComment(value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch('https://videoplayaserver.cyclic.app/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: props.userId,
            newComment: newComment,
            videoId: focusedVideo._id,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && setFocusedVideo(data));
    } catch (err) {
      console.log(err);
    }
    setComment('');
  }
  //Youtube Player
  let videoCode;
  // console.log(focusedVideo ? focusedVideo.videoUrl : '');
  videoCode = focusedVideo
    ? focusedVideo.videoUrl.split('v=')[1].split('&')[0]
    : '';

  const opts = {
    height: '300', //420
    width: '380', //800
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <>
      <Navbar
        Nav1={'Home'}
        onNav1={handleHome}
        Nav2={'Upload Video'}
        onNav2={handleNewVideo}
        Nav3={'My Likes'}
        onNav3={handleMyLikes}
        Nav4={'SignOut'}
        onNav4={handleSignOut}
      />
      {focusedVideo ? (
        <div className="bg-[#2C3333] py-4 md:px-80 text-slate-100">
          <p
            className="text-end text-3xl p-2 font-fredoka cursor-pointer text-orange-500 hover:text-orange-400"
            onClick={() => setFocusedVideo('')}
          >
            x
          </p>
          <center>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              opts={opts}
            />
          </center>

          <div className="comments rounded bg-[#303139] px-4">
            <p className="text-start">Comments :</p>
            <ul className=" py-2">
              {focusedVideo.comments.map((comment) => (
                <li className="py-2">
                  <p className="text-xs">Anonymous User</p>
                  <hr className="text-orange-500 w-12" />
                  <p> → {comment}</p>
                </li>
              ))}
            </ul>
            <br />
            <form onSubmit={handleSubmit}>
              <label htmlFor="newComment">Add a comment </label>
              <br />
              <input
                type="text"
                className="bg-gray-500 text-slate-100 rounded pl-1 focus:outline-none"
                id="newComment"
                onChange={handleCommentChange}
                value={newComment}
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-300 rounded px-4 text-white"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2  font-fredoka py-4 px-4 md:px-8 bg-gradient-to-r from-red-500 to-orange-400">
            <div className="userPageText md:my-6 text-white text-2xl md:text-3xl lg:text-4xl">
              <img
                className=" rounded-full inline-block w-28 md:w-40"
                src="/billie.webp"
                alt=""
              />
              <p className="py-2">Hello {props.userName}</p>
            </div>

            <div className="refresh text-end my-4 lg:my-12 pr-2 md:pr-8">
              <button
                className="text-white active:translate-y-1 hover:cursor-pointer text-2xl p-4 rounded-lg active:shadow-sm  shadow-lg hover:text-[#f3eeff]"
                onClick={handleRerender}
              >
                Refresh
              </button>
            </div>
          </div>
          {!isUploadClicked && !isMyLikesClicked ? (
            <Videos
              seed={seed}
              onLike={handlelike}
              onComment={handleCommentClick}
            />
          ) : isUploadClicked ? (
            <UploadNewVideo
              newUserData={newData}
              onTap={handleRerender}
              userId={props.userId}
            />
          ) : isMyLikesClicked ? (
            <MyLikes likes={props?.likedVideos} />
          ) : (
            <Videos
              seed={seed}
              onLike={handlelike}
              onComment={handleCommentClick}
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default UserPage;

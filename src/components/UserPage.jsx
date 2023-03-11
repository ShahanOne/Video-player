import Navbar from './Navbar';
import Videos from './Videos';
// import ListNewItem from './ListNewItem';
// import MyAccount from './MyAccount';
// import ItemPage from './ItemPage';
import { useState } from 'react';

function UserPage(props) {
  const [isUploadClicked, setUploadClick] = useState(false);
  const [isLikesClicked, setLikesClick] = useState(false);

  const [seed, setSeed] = useState(1);

  function handleHome() {
    setLikesClick(false);
    setUploadClick(false);
  }
  function handleNewVideo() {
    setUploadClick(true);
    setLikesClick(false);
  }
  function handleMyLikes() {
    setLikesClick(true);
    setUploadClick(false);
  }
  function handleSignOut() {
    // window.location.reload();
    props.handleSignOut();
  }
  function handleRerender() {
    setSeed(Math.random());
    setUploadClick(false);
    setLikesClick(false);
  }

  //Add to Likes
  async function handleWishlist(video) {
    try {
      const res = await fetch('http://localhost:3001/like', {
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
      <div className="userDiv">Hello {props.userName} !</div>
    </>
  );
}

export default UserPage;
// Todo
//all listings
//posted
//sell status
//bought

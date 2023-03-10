import { useState } from 'react';
import './App.css';

function UploadNewVideo(props) {
  const [videoTitle, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  function handleTitleChange(e) {
    const { value } = e.target;

    setTitle(value);
  }
  function handleUrlChange(e) {
    const { value } = e.target;

    setVideoUrl(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onTap();

    try {
      const res = await fetch('http://localhost:3001/new-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            videoTitle: videoTitle,
            videoUrl: videoUrl,
            userId: props.userId,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && props.newUserData(data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="font-allerta bg-gradient-to-r from-red-600 to-orange-400  px-[5%] pt-[15%] pb-[50%] lg:p-[2%_25%_15%]">
      <form
        className="shadow-xl p-4 lg:p-[5%] bg-[#f3e4d2] rounded-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="videoTitle">
          Video Title <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-md w-[100%] h-[2rem] m-[3%_0] focus:outline-none"
          id="videoTitle"
          type="text"
          value={videoTitle}
          onChange={handleTitleChange}
          name="itemName"
        />
        <label className="text-md m-[1%_0]" htmlFor="videoUrl">
          Video Youtube Link <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-md w-[100%] px-2 h-[2rem] m-[3%_0] focus:outline-none"
          id="videoUrl"
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          name="itemPrice"
        />
        <div className="messageDiv">
          <p
            className="m-0"
            style={
              videoTitle && videoUrl
                ? { visibility: 'hidden' }
                : { color: '#9b1414' }
            }
          >
            Please fill in the required fields *
          </p>
        </div>
        <center>
          {' '}
          <button
            className="bg-gradient-to-r from-red-500 to-orange-600 shadow-xl hover:to-orange-600 hover:from-red-500  border-[#ff8251] shadow-lg active:translate-y-0.5  text-white text-xl w-[66%] p-[2%] m-[3%_0] rounded-2xl border-2"
            type={videoTitle && videoUrl ? 'submit' : 'button'}
          >
            {' '}
            Upload Video
          </button>
        </center>{' '}
      </form>
    </div>
  );
}

export default UploadNewVideo;

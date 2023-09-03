import { useState } from 'react';
import './App.css';
// components
import Navbar from './Navbar';
import Videos from '../components/Videos';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import UserPage from './UserPage';
import { animateScroll as scroll } from 'react-scroll'; // Import react-scroll
function App() {
  const [logOrRegister, setLogOrRegister] = useState(true);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  function handleHome() {
    window.location.reload();
  }
  function handleUserData(data) {
    setUserInfo(data);
    setAuthenticated((value) => !value);
  }
  function refreshUserData(data) {
    setUserInfo(data);
  }

  function handleSignOut() {
    setAuthenticated((value) => !value);
  }

  return (
    <div className="font-allerta">
      {isAuthenticated ? (
        <UserPage
          newUserData={refreshUserData}
          userId={userInfo._id}
          userName={userInfo.username}
          likedVideos={userInfo.likedVideos}
          handleSignOut={handleSignOut}
        />
      ) : (
        <div className="App">
          {showSignInForm &&
            (logOrRegister ? (
              <Login
                onLogin={() => setShowSignInForm(false)}
                userData={handleUserData}
                onGoToRegister={() => setLogOrRegister(false)}
                onCut={() => setShowSignInForm(false)}
              />
            ) : (
              <Register
                onGoToLogin={() => setLogOrRegister(true)}
                onCut={() => setShowSignInForm(false)}
              />
            ))}
          <div className="welcomeDiv bg-[#1c1c24]">
            <Navbar
              Nav2="Home"
              onNav2={handleHome}
              Nav3="Login/Register"
              onNav3={() => {
                setShowSignInForm(true);
                scroll.scrollToTop();
              }}
            />
            <div className=" px-6 md:px-12 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  className={`text-center rounded-3xl  ${
                    !showSignInForm ? 'animate-slow-bounce' : ''
                  } transition-transform`}
                  src="/vid.webp"
                  alt=""
                />
                <p className="text-white text-[1.5rem] md:text-[2rem] font-fredoka p-10 md:p-20 ">
                  Upload, Watch and Like entaertaining videos !
                </p>
              </div>
            </div>
          </div>
          <Videos
            onLike={() => {
              setShowSignInForm(true);
              scroll.scrollToTop();
            }}
            onView={() => {
              setShowSignInForm(true);
              scroll.scrollToTop();
            }}
          />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

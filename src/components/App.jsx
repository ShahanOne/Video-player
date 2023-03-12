import './App.css';
import Navbar from './Navbar';
import Videos from '../components/Videos';
import Footer from './Footer';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import UserPage from './UserPage';

function App() {
  const [logOrRegister, setLogOrRegister] = useState(true);
  const [isSignClick, setSignClick] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  function handleHome() {
    window.location.reload();
  }
  function handleSignInClick() {
    setSignClick((value) => !value);
  }
  function handleUserData(data) {
    setUserInfo(data);
    setAuthenticated((value) => !value);
  }
  function refreshUserData(data) {
    setUserInfo(data);
  }
  function login() {
    setSignClick(false);
  }
  function loginError() {
    window.alert('user not found,please register or try again');
  }
  function register() {
    window.alert('Registered, You Can Login Now');
  }
  function goToLogin() {
    setLogOrRegister(true);
  }
  function goToRegister() {
    setLogOrRegister(false);
  }
  function handleSignOut() {
    setAuthenticated((value) => !value);
  }

  return (
    <div className=" text-orange-600 font-allerta">
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
          {isSignClick &&
            (logOrRegister ? (
              <Login
                onLogin={login}
                onError={loginError}
                userData={handleUserData}
                onGoToRegister={goToRegister}
                onCut={handleSignInClick}
              />
            ) : (
              <Register
                onRegister={register}
                onGoToLogin={goToLogin}
                onCut={handleSignInClick}
              />
            ))}
          <div className="welcomeDiv bg-gradient-to-r from-red-500 to-orange-400">
            <Navbar
              Nav2="Home"
              onNav2={handleHome}
              Nav3="Login/Register"
              onNav3={handleSignInClick}
            />
            <div className="text-center px-12 py-4">
              <p className="text-white text-[3.5rem] font-fredoka py-12 ">
                Welcome to VideoPlaya !
              </p>
              <div className="grid grid-cols-2">
                <img
                  className={`text-center rounded-3xl  ${
                    !isSignClick ? 'animate-slow-bounce' : ''
                  } transition-transform`}
                  src="/billie.webp"
                  alt=""
                />
                <p className="text-white text-[3rem] font-fredoka p-20 ">
                  Upload, Watch and Like entaertaining videos !
                </p>
              </div>
            </div>
          </div>
          <Videos onLike={handleSignInClick} onComment={handleSignInClick} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;

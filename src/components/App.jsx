import './App.css';
import Navbar from './Navbar';
import Videos from '../components/Videos';
import Footer from './Footer';
import YouTubePlayer from './YoutubePlayer';
function App() {
  function handleHome() {}
  function handleLogin() {}

  return (
    <div className="App">
      <div className="welcomeDiv bg-gradient-to-r from-red-500 to-orange-400">
        <Navbar
          Nav2="Home"
          onNav2={handleHome}
          Nav3="Login/Register"
          onNav3={handleLogin}
        />
        <div className="text-center px-12 py-4">
          <p className="text-white text-[3.5rem] font-fredoka py-12 ">
            Welcome to VideoPlaya !
          </p>
          <div className="grid grid-cols-2">
            <img
              className="text-center rounded-xl animate-slow-bounce"
              src="/billie.webp"
              alt=""
            />
            <p className="text-white text-[3rem] font-fredoka p-20 ">
              Upload, Watch and Like entaertaining videos !
            </p>
          </div>
        </div>
      </div>
      <Videos />
      <Footer />
    </div>
  );
}

export default App;

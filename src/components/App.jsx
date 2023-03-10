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
        <p className="text-white text-[4rem] font-fredoka p-20 ">
          Welcome to VideoPlaya !
        </p>
      </div>
      <Videos />
      <Footer />
    </div>
  );
}

export default App;

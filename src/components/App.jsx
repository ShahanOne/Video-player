import './App.css';
import Videos from '../components/Videos';

function App() {
  function handleLike() {
    alert('liked');
  }

  return (
    <div className="App">
      Honka Honka!
      <Videos onLike={handleLike} />
    </div>
  );
}

export default App;

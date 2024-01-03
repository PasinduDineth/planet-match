import './App.css'
import Game from './components/game'
import useAudio from './utils/useAudio'
function App() {
  const playBackgroundMusic = useAudio('backgroundMusic');
  playBackgroundMusic()
  return (
    <div className='flex h-screen justify-center items-center'>
      <Game/>
    </div>
  )
}

export default App

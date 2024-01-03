import { useRef } from 'react';
import backgroundMusic from '../../src/assets/bg-music.mp3';
import dropMusic from '../../src/assets/drop.mp3';
import winMusic from '../../src/assets/win.mp3';

type AudioVariable = 'backgroundMusic' | 'dropMusic' | 'winMusic';

const useAudio = (audioVariable: AudioVariable) => {
  const audioSources: Record<AudioVariable, string> = {
    backgroundMusic,
    dropMusic,
    winMusic,
  };

  const audioRef = useRef(new Audio(audioSources[audioVariable]));
  if (audioVariable === 'backgroundMusic') {
    audioRef.current.loop = true;
  }
  const playAudio = () => {
    audioRef.current.play();
  };

  return playAudio;
};

export default useAudio;

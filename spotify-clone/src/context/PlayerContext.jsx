import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  //state variables to manage the project state
  const [track, setTrack] = useState(songsData[0]); //whenever we load the project our defualt track will be our first song
  const [playStatus, setPlayStatus] = useState(false); //when ever loaded the project that will be paused
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      //track total duration
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  // whatever fuction/state we create in this contextvalue we can acess that in any other component
  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,pause
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

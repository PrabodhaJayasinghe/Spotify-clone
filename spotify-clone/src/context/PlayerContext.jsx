import { createContext, useEffect, useRef, useState } from "react";
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

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async() => {
    if (track.id>0){
      await setTrack(songsData[track.id-1]);
      await audioRef.current.play()
      setPlayStatus(true);
    }
  }

  const next = async() => {
    if (track.id<songsData.length-1){
      await setTrack(songsData[track.id+1]);
      await audioRef.current.play()
      setPlayStatus(true);
    }
  }

   const seekSong = async(e) => {
     //console.log(e);
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

  useEffect(() => {
    setTimeout( () => {
        audioRef.current.ontimeupdate =() =>
         { seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%"  //60s 30scomplete 30/60
          setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60), //127s 127%60 = 7s
          minute: Math.floor(audioRef.current.currentTime / 60)  //120s 120/60 = 2min
        },
        totalTime: {
          //track total duration
          second: Math.floor(audioRef.current.duration % 60), 
          minute: Math.floor(audioRef.current.duration / 60)
        }  
          } )
 }
},1000);
},[audioRef])

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
    play,pause,
    playWithId,
    previous,next,
    seekSong

  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

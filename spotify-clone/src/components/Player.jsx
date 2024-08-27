import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {

  const {track,seekBar,seekBg,playStatus,play,pause,time} = useContext(PlayerContext);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="items-center hidden gap-4 lg:flex">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img className="w-4 cursor pointer" src={assets.prev_icon} alt="" />
          {playStatus
          ?  <img onClick = {pause} className="w-4 cursor pointer" src={assets.pause_icon} alt="" />
          :
          <img onClick = {play} className="w-4 cursor pointer" src={assets.play_icon} alt="" />
          }
          
          
          <img className="w-4 cursor pointer" src={assets.next_icon} alt="" />
          <img className="w-4 cursor pointer" src={assets.loop_icon} alt="" />
        </div>

        <div className="flex items-center gap-5 ">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} className="bg-gray-300 w-[60vw] max-w-[500px] rounded-full cursor-pointer">
            <hr ref={seekBar} className="w-0 h-1 bg-green-800 border-none rounded-full" />
          </div>
          <p>{time.totalTime.minute}:{time.currentTime.second}</p>
        </div>
      </div>
      <div className="items-center hidden gap-2 opacity-75 lg:flex">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.plays_icon} alt="" />
        <div className="w-20 h-1 rounded bg-slate-50"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;

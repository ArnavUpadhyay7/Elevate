import React, { useEffect, useRef } from "react";
import { useAudioStore } from "../store/audioStore";
import music from "../assets/music.mp3"
import { IconMusic, IconMusicCancel } from "@tabler/icons-react";

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const { isPlaying, togglePlayPause } = useAudioStore();

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div>
      <audio ref={audioRef} src={music} loop />

      <div className="absolute z-50 text-white">
          <button onClick={togglePlayPause} className="fixed md:top-10 md:bottom-auto bottom-4 md:right-10 right-4 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">{isPlaying ? 
            <div> <IconMusicCancel /> </div> 
            : 
            <div> <IconMusic /> </div>
            }
            </button>
          <audio loop ref={audioRef} src={music} />
        </div>
    </div>
  );
};

export default GlobalAudioPlayer;

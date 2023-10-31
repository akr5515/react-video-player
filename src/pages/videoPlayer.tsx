import ReactPlayer from "react-player";
import "./videoPlayer.style.css";
import { Container } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import Control from "../components/control";
import { formatTime } from "../utils/format";
import { useLocation } from "react-router-dom";

type VideoState = {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  seeking: boolean;
  buffer: boolean;
};

function VideoPlayer() {
  const location = useLocation();

  const [videoState, setVideoState] = useState<VideoState>({
    playing: true,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: false,
  });

  const { playing, muted, volume, played, seeking, buffer } = videoState;

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
  };

  const videoPlayerRef = useRef<ReactPlayer | null>(null);
  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(
        videoPlayerRef.current.getCurrentTime() - 5
      );
    }
  };

  const fastFowardHandler = () => {
    //FastFowards the video player by adding 5
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(
        videoPlayerRef.current.getCurrentTime() + 5
      );
    }
  };

  const [count, setCount] = useState<number>(0);
  const controlRef = useRef<HTMLElement>(null);

  const progressHandler = (state: { played: number }) => {
    if (count > 1 && controlRef.current) {
      // toggling player control container

      controlRef.current.style.visibility = "hidden";
    } else if (
      controlRef.current &&
      controlRef.current.style.visibility === "visible"
    ) {
      setCount((cnt) => cnt + 1);
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  const seekHandler = (
    event: ChangeEvent<object>,
    value: number | number[]
  ) => {
    setVideoState({
      ...videoState,
      played: parseFloat(value.toString()) / 100,
    });
  };

  const seekMouseUpHandler = (
    event: ChangeEvent<object>,
    value: number | number[]
  ) => {
    setVideoState({ ...videoState, seeking: false });
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(parseFloat(value.toString()) / 100);
    }
  };

  const volumeChangeHandler = (
    event: ChangeEvent<object>,
    value: number | number[]
  ) => {
    const newVolume = parseFloat(value.toString()) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (
    event: ChangeEvent<object>,
    value: number | number[]
  ) => {
    const newVolume = parseFloat(value.toString()) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : "00:00";

  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : "00:00";

  const formatCurrentTime =
    currentTime === "00:00" ? "00:00" : formatTime(currentTime);

  const formatDuration = duration === "00:00" ? "00:00" : formatTime(duration);

  const mouseMoveHandler = () => {
    if (controlRef.current) {
      controlRef.current.style.visibility = "visible";
    }
    setCount(0);
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    setVideoState({ ...videoState, buffer: false });
  };

  return (
    <div className="video_container">
      <div>
        <h2>React player</h2>
      </div>
      <Container>
        <div
          className="player__wrapper"
          onMouseMove={mouseMoveHandler}
          onClick={mouseMoveHandler}
        >
          <ReactPlayer
            ref={videoPlayerRef}
            className="player"
            url={
              location.state?.videoURL
                ? location.state.videoURL
                : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
          />
          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={fastFowardHandler}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            buffering={buffer}
          />
        </div>
      </Container>
    </div>
  );
}
export default VideoPlayer;

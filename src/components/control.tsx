import React from "react";
import {
  makeStyles,
  Slider,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  SkipNext,
  VolumeUp,
} from "@material-ui/icons";
import "./control.style.scss";
import { VolumeOff } from "@mui/icons-material";

const useStyles = makeStyles({
  volumeSlider: {
    width: "100px",
    color: "#f0f0f0",
  },

  bottomIcons: {
    color: "#999",
    padding: "12px 8px",

    "&:hover": {
      color: "#fff",
    },
  },
});

const CustomSlider = withStyles({
  root: {
    height: "20px",
    color: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#f0f0f0",
    border: "2px solid currentColor",
    marginTop: -3,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  rail: {
    height: 5,
    borderRadius: 4,
  },
})(Slider);

type ControlType = {
  controlRef: HTMLElement | null;
  onPlayPause: () => void;
  playing: boolean;
  onRewind: () => void;
  onForward: () => void;
  played: number;
  onSeek: (e: React.MouseEvent<HTMLButtonElement>, value: string) => void;
  onSeekMouseUp: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
  volume: number;
  onVolumeChangeHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
  onVolumeSeekUp: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
  mute: boolean;
  onMute: () => void;
  duration: string;
  currentTime: string;
  buffering: boolean;
};

const Control = ({
  controlRef,
  onPlayPause,
  playing,
  onRewind,
  onForward,
  played,
  onSeek,
  onSeekMouseUp,
  volume,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  mute,
  onMute,
  duration,
  currentTime,
  buffering,
}: ControlType) => {
  const classes = useStyles();

  return (
    <div className="control_Container" ref={controlRef}>
      <div className="top_container">
        <h2>Video Player</h2>
      </div>

      <div className="mid__container">
        {!buffering && (
          <>
            <div className="icon__btn" onClick={onRewind}>
              <FastRewind fontSize="medium" />
            </div>
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>
            <div className="icon__btn">
              <FastForward fontSize="medium" onClick={onForward} />
            </div>
          </>
        )}

        {buffering && (
          <div className="icon__btn">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>

      <div className="bottom__container">
        <div className="slider__container">
          <CustomSlider
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
          />
        </div>
        <div className="control__box">
          <div className="inner__controls">
            <div className="icon__btn" onClick={onPlayPause}>
              {playing ? (
                <Pause fontSize="medium" />
              ) : (
                <PlayArrow fontSize="medium" />
              )}{" "}
            </div>
            <div className="icon__btn">
              <SkipNext fontSize="medium" />
            </div>
            <div className="icon__btn" onClick={onMute}>
              {mute ? (
                <VolumeOff fontSize="medium" />
              ) : (
                <VolumeUp fontSize="medium" />
              )}
            </div>

            <Slider
              className={`${classes.volumeSlider}`}
              onChange={onVolumeChangeHandler}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />
            <span>
              {currentTime} : {duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;

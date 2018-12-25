import React, { Component } from "react";
import ReactHowler from "react-howler";

class FullControl extends Component {
  state = {
    playing: false,
    loaded: false,
    loop: false,
    mute: false,
    volume: 1.0
  };
  handleToggle = () => {
      this.setState((prevState)=>{
          playing: !prevState.playing
      })
  };
  handleOnLoad = () => {
      this.setState(()=>{
        loaded: true;
      })
  };
  handleOnEnd = () => {};
  handleOnPlay = () => {};
  handleStop = () => {};
  handleSeekPos = () => {};
  handleLoopToggle = () => {};
  handleMuteToggle = () => {};
}

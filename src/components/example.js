import React from "react";
import ReactHowler from "react-howler";
import { Button } from "semantic-ui-react";
import m1 from "../assets/audio/theme-music.mp3";
import m2 from "../assets/audio/f1-mp3.mp3";

class OnlyPlayPauseButton extends React.Component {
  state = {
    playing: false
  };

  handlePlay = () => {
    this.setState({
      playing: true
    });
  };

  handlePause = () => {
    this.setState({
      playing: false
    });
  };

  render() {
    return (
      <div>
        <ReactHowler src={[m1, m2]} playing={this.state.playing} />
        <Button onClick={this.handlePlay}>Play</Button>
        <Button onClick={this.handlePause}>Pause</Button>
      </div>
    );
  }
}

export default OnlyPlayPauseButton;

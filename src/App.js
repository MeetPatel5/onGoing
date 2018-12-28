import React, { Component, Fragment } from "react";
import ReactPlayer from "react-player";
import { Button, Card, CardContent } from "@material-ui/core";
import {
  PlayArrowSharp,
  PauseSharp,
  SkipNextSharp,
  SkipPreviousSharp,
  FolderOpenSharp
} from "@material-ui/icons";
import { Slider } from "@material-ui/lab";

// Styling
import "./assets/App.scss";

class App extends Component {
  state = {
    url: null,
    pip: false,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  };

  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  onPlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  onPause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  load = url => {
    this.setState({
      url: url
    });
  };

  onProgress = state => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  render() {
    const { url, playing } = this.state;
    return (
      <div className="app">
        <ReactPlayer
          height={0}
          width={0}
          onProgress={this.onProgress}
          url={url}
          playing={playing}
          controls={false}
        />
        <Card className="card">
          <Button
            variant="contained"
            onClick={() =>
              this.load(
                "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3"
              )
            }
          >
            Load URL
          </Button>
          <CardContent className="card-content">
            <div className="icons">
              {url && playing ? (
                <PauseSharp
                  onClick={this.onPause}
                  color="secondary"
                  className="huge"
                />
              ) : (
                <PlayArrowSharp
                  onClick={this.onPlay}
                  color="secondary"
                  className="huge"
                />
              )}

              <SkipPreviousSharp color="secondary" className="large" />
              <SkipNextSharp color="secondary" className="large" />
              {/* <FolderOpenSharp color="secondary"/> */}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;

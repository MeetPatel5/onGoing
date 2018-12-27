import React, { Component, Fragment } from "react";
import { PlayerConsumer, PlayerProvider } from "./components/player";
import ReactHowler from "react-howler";
import "./assets/App.css";

import { Button } from "@material-ui/core";
import {
  PlayArrowSharp,
  PauseSharp,
  KeyboardArrowRightSharp,
  KeyboardArrowLeftSharp,
  FolderOpenSharp
} from "@material-ui/icons";
import { Slider } from "@material-ui/lab";

class App extends Component {
  state = {
    isPlaying: true,
    currentSeek: 0,
    totalLength: 0
  };

  togglePlay = () => {
    this.setState(prevState => {
      return {
        isPlaying: !prevState.isPlaying
      };
    });
  };

  onLoad = () => {
    this.setState({
      totalLength: Math.round(this.music.duration())
    });
  };

  componentDidMount() {
    this.interval = setInterval(() => this.getSeek(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getSeek = () => {
    this.setState({
      currentSeek: Math.round(this.music.seek()) || 0
    });
  };

  render() {
    const { isPlaying } = this.state;
    return (
      <PlayerProvider>
        <PlayerConsumer>
          {context => {
            const {
              changeSong,
              loadFiles,
              currentSongFile,
              playNextSong,
              playPrevSong,
              songFileNames,
              songFiles
            } = context;

            const { currentSeek, totalLength } = this.state;

            return (
              <Fragment>
                <h1>{songFileNames[currentSongFile.songIndex]}</h1>
                <Slider value={currentSeek} min={0} max={totalLength} />
                <h4> {totalLength}</h4>
                <Button color="secondary" onClick={this.getSeek}>
                  get currentSeek
                </Button>
                <Button color="secondary" onClick={changeSong}>
                  Play Random Track
                </Button>

                <FolderOpenSharp onClick={loadFiles} />

                <ReactHowler
                  src={[currentSongFile.song]}
                  playing={isPlaying}
                  ref={ref => (this.music = ref)}
                  onLoad={this.onLoad}
                  onEnd={() => playNextSong(currentSongFile["songIndex"] + 1)}
                />
                {/* Icons */}
                <KeyboardArrowLeftSharp
                  color="secondary"
                  onClick={() => playPrevSong(currentSongFile["songIndex"] - 1)}
                />

                {this.state.isPlaying && songFiles.length > 0 ? (
                  <PauseSharp
                    onClick={songFiles.length > 0 ? this.togglePlay : null}
                    color="primary"
                  />
                ) : (
                  <PlayArrowSharp
                    onClick={songFiles.length > 0 ? this.togglePlay : null}
                    color="primary"
                  />
                )}
                <KeyboardArrowRightSharp
                  color="secondary"
                  onClick={() => playNextSong(currentSongFile["songIndex"] + 1)}
                />
                {/* Icons */}
              </Fragment>
            );
          }}
        </PlayerConsumer>
      </PlayerProvider>
    );
  }
}

export default App;

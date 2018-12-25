import React, { Component, Fragment } from "react";
import { PlayerConsumer, PlayerProvider } from "./components/player";
import ReactHowler from "react-howler";
import "./assets/App.css";

import { Button, Icon, Card } from "semantic-ui-react";

class App extends Component {
  state = {
    isPlaying: true,
    currentSeek: 0
  };

  togglePlay = () => {
    this.setState(prevState => {
      return {
        isPlaying: !prevState.isPlaying
      };
    });
  };

  getSeek = () => {
    const a = this.music.seek();
    this.setState(
      {
        currentSeek: a
      },
      () => {
        console.log(this.state.currentSeek);
      }
    );
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

            return (
              <Fragment>
                <Card
                  fluid
                  color="red"
                  header={songFileNames[currentSongFile.songIndex]}
                />
                <Button onClick={changeSong}>Play Random Track</Button>
                <Button onClick={this.getSeek}>get currentSeek</Button>
                <Icon name="folder outline" size="huge" onClick={loadFiles} />
                <ReactHowler
                  src={[currentSongFile.song]}
                  playing={isPlaying}
                  ref={ref => (this.music = ref)}
                  onLoad={this.handleLoadMusic}
                />
                <Icon
                  size="huge"
                  name="angle left"
                  onClick={() => playPrevSong(currentSongFile["songIndex"] - 1)}
                />
                {this.state.isPlaying && songFiles.length > 0 ? (
                  <Icon size="huge" onClick={this.togglePlay} name="pause" />
                ) : (
                  <Icon size="huge" onClick={this.togglePlay} name="play" />
                )}
                <Icon
                  size="huge"
                  name="angle right"
                  onClick={() => playNextSong(currentSongFile["songIndex"] + 1)}
                />
              </Fragment>
            );
          }}
        </PlayerConsumer>
      </PlayerProvider>
    );
  }
}

export default App;

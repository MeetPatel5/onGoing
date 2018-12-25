import React, { Component, createContext } from "react";
import uuid from "uuid";

const path = window.require("path");
const { remote } = window.require("electron");
const { dialog } = remote;

const PlayerContext = createContext();

class PlayerProvider extends Component {
  state = {
    // State
    songFiles: [],
    songFileNames: [],
    currentSongFile: {},
    // Actions
    loadFiles: () => {
      dialog.showOpenDialog(
        {
          properties: ["openFile", "multiSelections"],
          filters: { name: "Music", extensions: ["mp3"] }
        },
        files => {
          if (!files) {
            return;
          } else {
            const songFiles = files.map((file, i) => ({
              songIndex: i,
              id: uuid(),
              song: file.toString()
            }));
            this.setState(
              {
                songFiles
              },
              () => {
                const { songFiles } = this.state;
                const songFileNames = songFiles.map(file => {
                  return path.basename(file.song, path.extname(file.song));
                });
                this.setState({
                  songFileNames,
                  currentSongFile: songFiles[0]
                });
              }
            );
          }
        }
      );
    },
    changeSong: () => {
      const { songFiles } = this.state;
      const randomIndex = Math.floor(Math.random() * songFiles.length);
      this.setState({
        currentSongFile: songFiles[randomIndex]
      });
    },
    playNextSong: nextSongIndex => {
      if (this.state.songFiles.length > nextSongIndex) {
        this.setState(prevState => ({
          currentSongFile: prevState.songFiles[nextSongIndex]
        }));
      } else {
        return;
      }
    },
    playPrevSong: prevSongIndex => {
      if (prevSongIndex >= 0) {
        this.setState(prevState => ({
          currentSongFile: prevState.songFiles[prevSongIndex]
        }));
      } else {
        return;
      }
    }
  };

  render() {
    return (
      <PlayerContext.Provider value={this.state}>
        {this.props.children}
      </PlayerContext.Provider>
    );
  }
}

const PlayerConsumer = PlayerContext.Consumer;

export { PlayerConsumer, PlayerProvider };

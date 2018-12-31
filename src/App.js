import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@material-ui/core";
import {
   PlayArrowSharp,
   PauseSharp,
   SkipNextSharp,
   SkipPreviousSharp,
   FolderOpenSharp
} from "@material-ui/icons";
import { PlayerConsumer, PlayerProvider } from "./components/player";

// Styling
import "./assets/App.scss";

class App extends Component {
   state = {
      playing: true,
      playedSeconds: 0,
      played: 0
   };

   togglePlayPause = () => {
      this.setState({ playing: !this.state.playing });
   };

   onSeekMouseDown = e => {
      this.setState({ seeking: true });
   };

   onSeekChange = e => {
      this.setState({ played: parseFloat(e.target.value) });
   };

   onSeekMouseUp = e => {
      this.setState({ seeking: false });
      this.player.seekTo(parseFloat(e.target.value));
   };

   onProgress = ({ played, playedSeconds }) => {
      console.log("onProgress", playedSeconds);
      const { seeking } = this.state;
      // We only want to update time slider if we are not currently seeking
      if (!seeking) {
         this.setState({
            played: played,
            playedSeconds: playedSeconds
         });
      }
   };

   render() {
      const { played, playing } = this.state;
      return (
         <PlayerProvider>
            <PlayerConsumer>
               {context => {
                  const {
                     songFiles,
                     songFileNames,
                     currentSongFile,
                     loadFiles,
                     playNextSong,
                     playPrevSong
                  } = context;
                  return (
                     <div className="app">
                        <ReactPlayer
                           ref={ref => (this.player = ref)}
                           controls={false}
                           height={0}
                           width={0}
                           url={currentSongFile.song}
                           playing={playing}
                           onProgress={this.onProgress}
                           onEnded={() =>
                              playNextSong(currentSongFile["songIndex"] + 1)
                           }
                        />

                        <Card className="card">
                           <h3>
                              {songFileNames[currentSongFile["songIndex"]]}
                           </h3>
                           <FolderOpenSharp
                              color="primary"
                              onClick={loadFiles}
                           />
                           <input
                              type="range"
                              min={0}
                              max={1}
                              step="any"
                              value={played}
                              onMouseDown={this.onSeekMouseDown}
                              onChange={this.onSeekChange}
                              onMouseUp={this.onSeekMouseUp}
                           />

                           <CardContent className="card-content">
                              <div className="icons">
                                 {playing && currentSongFile["song"] ? (
                                    <PauseSharp
                                       onClick={this.togglePlayPause}
                                       color="secondary"
                                       className="huge"
                                    />
                                 ) : (
                                    <PlayArrowSharp
                                       onClick={this.togglePlayPause}
                                       color="secondary"
                                       className="huge"
                                    />
                                 )}

                                 <SkipPreviousSharp
                                    onClick={() => {
                                       playPrevSong(
                                          currentSongFile["songIndex"] - 1
                                       );
                                    }}
                                    color="secondary"
                                    className="large"
                                 />
                                 <SkipNextSharp
                                    onClick={() =>
                                       playNextSong(
                                          currentSongFile["songIndex"] + 1
                                       )
                                    }
                                    color="secondary"
                                    className="large"
                                 />
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  );
               }}
            </PlayerConsumer>
         </PlayerProvider>
      );
   }
}

export default App;

import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@material-ui/core";
import playSvg from "./assets/svg/play-button.svg"
import pauseSvg from "./assets/svg/pause.svg"
import rightArrowSvg from "./assets/svg/right-arrow.svg"
import leftArrowSvg from "./assets/svg/left-arrow.svg"
// import closeSvg from "./assets/svg/close.svg"
import plusSvg from "./assets/svg/plus.svg"
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
                           <img src={plusSvg} onClick={loadFiles} alt="plusSvg" height={50} width={50}/>
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
                                    <img onClick={this.togglePlayPause} height={50} width={50} src={pauseSvg} alt="pauseSvg"/>
                                    ) : (
                                       <img onClick={this.togglePlayPause} height={50} width={50} src={playSvg} alt="playSvg"/>
                                    )}

                                 <img src={leftArrowSvg} height={50} width={50}  onClick={() => {
                                       playPrevSong(
                                          currentSongFile["songIndex"] - 1
                                       );
                                    }}  alt="leftArrowSvg"/>
                                 
                                 <img src={rightArrowSvg} onClick={() =>
                                       playNextSong(
                                          currentSongFile["songIndex"] + 1
                                       )
                                    } height={50} width={50}  alt="rightArrowSvg"/>
                                 
                                 {/* <RepeatSharp
                                    onClick={() =>
                                       console.log("Enable Play Me Again")
                                    }
                                    color="secondary"
                                    className="large"
                                 />
                                 
                                 <RepeatOneSharp
                                    onClick={() =>
                                       console.log("Disable Play Me Again")
                                    }
                                    color="secondary"
                                    className="large"
                                 /> */}
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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { mockData, screens } from '../../../../constants';
import RoundWinnerSelection from './RoundWinnerSelection';
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';

const RoundWinnerSelectionContainer = (props) => {
  const [submittedWinner, setSubmittedWinner] = useState();
  const [selectedWinner, setSelectedWinner] = useState();
  const [songIsPlaying, setSongIsPlaying] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentSongURI, setcurrentSongURI] = useState(null); 

  useEffect(() => {
    props.subscribeVotingRoundUpdates()

    if(props.selectPlayerVotedSong) {
      setSelectedWinner(props.selectPlayerVotedSong)
      setSubmittedWinner(props.selectPlayerVotedSong)
    }
    
    return props.unsubscribeGameplayUpdates
  }, [])

  const handlePlaySong = song => {
    console.log('play song:', song);
    if (!songIsPlaying) {
      setSongIsPlaying(true);
      setcurrentSongURI(song.uri);
      if (currentSongURI != song.uri) {
        props.playSong(song, startPosition);
      } else {
        props.resumeSong();
      }
    } else {
      setSongIsPlaying(false);
      props.pauseSong();
    }
    
  };

  const handleSubmitWinner = song => {
    props.voteRoundWinner(song.playerId);
    setSubmittedWinner(song);
  };

  const handleSelectWinner = song => setSelectedWinner(song);

  return (
    <RoundWinnerSelection
      isLoading={props.selectIsLoading}
      songs={props.selectPlayerSubmittedSongs}
      players={props.selectPlayers}
      timeLeft={props.selectTimerTick}
      scenario={props.selectCardContent}
      userSongEntry={props.selectPlayerSubmittedSong}
      submittedWinner={submittedWinner}
      selectedWinner={selectedWinner}
      onPlaySong={handlePlaySong}
      onSelectWinner={handleSelectWinner}
      onSubmitWinner={handleSubmitWinner}
      songIsPlaying={songIsPlaying}
      songPlayingURI={currentSongURI}
      disableSubmission={!!props.selectPlayerVotedSong}
    />
  );
};

const mapStateToProps = (state) => ({
  selectTimerTick: GameplaySelectors.selectTimerTick(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  selectPlayers: GameplaySelectors.selectPlayers(state),
  selectPlayerSubmittedSong: GameplaySelectors.selectPlayerSubmittedSong(state),
  selectPlayerSubmittedSongs: GameplaySelectors.selectPlayerSubmittedSongs(state),
  selectPlayerVotedSong: GameplaySelectors.selectPlayerVotedSong(state),
  selectIsLoading: GameplaySelectors.isLoading(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  //isUserInMatch: playerId => dispatch(LobbyActions.fetchUserInOpenMatch(playerId))
  subscribeVotingRoundUpdates: () => dispatch(GameplayActions.subscribeVotingRoundUpdates()),
  unsubscribeGameplayUpdates: () => dispatch(GameplayActions.unsubscribeGameplayUpdates()),
  voteRoundWinner: (playerId) => dispatch(GameplayActions.voteRoundWinner(playerId)),
  playSong: (song) => dispatch(GameplayActions.playSong(song)),
  pauseSong: () => dispatch(GameplayActions.pauseSong()),
  resumeSong: () => dispatch(GameplayActions.resumeSong()),
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerSelectionContainer)

import React, { useState, useEffect } from 'react';
import RoundWinnerRandomizer from './RoundWinnerRandomizer';
import { connect } from 'react-redux'
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';
import { mockData, screens } from '../../../../constants';
import { NavigationActions } from 'react-navigation'

const RoundWinnerRandomizerContainer = props => {
  const [winnerSongTitle, setWinnerSongTitle] = useState(null)

  useEffect(() => {
    const songs = props.songsForTiebreak
    const rand = Math.floor(Math.random() * songs.length);
    setWinnerSongTitle(songs[rand].playerId)

setTimeout(() => {
  console.tron.log('winnerSongTitle', winnerSongTitle)
}, 1000)    

    setTimeout(() => {
      props.navigateToRoundWinner()
    }, 8000)  

    return () => {
      const currentRound = GameplaySelectors.selectRound
      const roundWinner = GameplaySelectors.selectRoundWinnerAsMutable
      roundWinner[`round${currentRound}`] = [winner]
      props.updateRoundWinner(winner)
    }
  }, [])

  return (
    <RoundWinnerRandomizer
      winnerSongTitle={winnerSongTitle}
      songs={props.songsForTiebreak}
      players={mockData.playersInGame}
      scenario={props.selectCardContent}
    />
  )
};

const mapStateToProps = (state) => ({
  currentRound: GameplaySelectors.selectRound(state),
  selectCardContent: GameplaySelectors.selectCardContent(state),
  songsForTiebreak: GameplaySelectors.selectSongsForTiebreak(state),
})
 
const mapDispatchToProps = (dispatch) => ({
  updateRoundWinner: (roundWinner) => dispatch(GameplayActions.updateRoundWinner(roundWinner)),
  navigateToRoundWinner: () => dispatch(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinner })),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerRandomizerContainer)

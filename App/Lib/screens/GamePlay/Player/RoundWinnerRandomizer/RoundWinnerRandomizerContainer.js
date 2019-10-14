import React, { useEffect } from 'react';
import RoundWinnerRandomizer from './RoundWinnerRandomizer';
import { connect } from 'react-redux'
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';
import { mockData } from '../../../../constants';

const RoundWinnerRandomizerContainer = props => {

  useEffect(() => {
    props.subscribeTiebreakerRound()

    return props.unsubscribeTiebreakerRound
  }, [])

  return (
    <RoundWinnerRandomizer
      winnerSongTitle={props.winnerSongTitle}
      songs={props.songsForTiebreak}
      players={props.selectPlayers}
      scenario={props.selectCardContent}
    />
  )
};

const mapStateToProps = (state) => ({
  selectCardContent: GameplaySelectors.selectCardContent(state),
  songsForTiebreak: GameplaySelectors.selectSongsForTiebreak(state),
  winnerSongTitle: GameplaySelectors.selectWinnerSongTitleFromTiebreak(state),
  selectPlayers: GameplaySelectors.selectPlayers(state),
})

const mapDispatchToProps = (dispatch) => ({
  // updateRoundWinner: (roundWinner) => dispatch(GameplayActions.updateRoundWinner(roundWinner)),
  // navigateToRoundWinner: () => dispatch(NavigationActions.navigate({ routeName: screens.gamePlay.roundWinner })),
  subscribeTiebreakerRound: () => dispatch(GameplayActions.subscribeTiebreakerRound()),
  unsubscribeTiebreakerRound: () => dispatch(GameplayActions.unsubscribeTiebreakerRound()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerRandomizerContainer)
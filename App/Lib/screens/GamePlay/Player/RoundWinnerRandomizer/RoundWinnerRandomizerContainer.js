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
      players={mockData.playersInGame}
      scenario={props.selectCardContent}
    />
  )
};

const mapStateToProps = (state) => ({
  selectCardContent: GameplaySelectors.selectCardContent(state),
  songsForTiebreak: GameplaySelectors.selectSongsForTiebreak(state),
  winnerSongTitle: GameplaySelectors.selectWinnerSongTitleFromTiebreak(state),
})

const mapDispatchToProps = (dispatch) => ({
  subscribeTiebreakerRound: () => dispatch(GameplayActions.subscribeTiebreakerRound()),
  subscribeGameWinnerTiebreaker: () => dispatch(GameplayActions.subscribeGameWinnerTiebreaker()),
  unsubscribeTiebreakerRound: () => dispatch(GameplayActions.unsubscribeTiebreakerRound()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerRandomizerContainer)
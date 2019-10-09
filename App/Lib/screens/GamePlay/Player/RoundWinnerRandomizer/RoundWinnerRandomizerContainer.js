import React from 'react';
import RoundWinnerRandomizer from './RoundWinnerRandomizer';
import { connect } from 'react-redux'
import GameplayActions, { GameplaySelectors } from '../../../../../Redux/GameplayRedux';
import { mockData } from '../../../../constants';

const RoundWinnerRandomizerContainer = props => (
  <RoundWinnerRandomizer
    songs={mockData.songs}
    players={mockData.playersInGame}
    scenario={props.selectCardContent}
  />
);

const mapStateToProps = (state) => ({
  selectCardContent: GameplaySelectors.selectCardContent(state),
})
 
const mapDispatchToProps = (dispatch) => ({
})
 
export default connect(mapStateToProps, mapDispatchToProps)(RoundWinnerRandomizerContainer)

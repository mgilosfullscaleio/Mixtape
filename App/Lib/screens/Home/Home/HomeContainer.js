import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Home from './Home';

import { mockData } from '../../../constants';
import { UserSelectors } from '../../../../Redux/UserRedux';
import LobbyActions from '../../../../Redux/LobbyRedux';

const mapStateToProps = state => ({
  user: UserSelectors.selectUserMatchData(state),
})

const mapDispatchToProps = (dispatch) => ({
  getMaximumPlayersByPlayWithOthers: () => dispatch(LobbyActions.getMaximumPlayersByPlayWithOthers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import AuthActions, { AuthSelectors } from '../../../../../Redux/AuthRedux';


const FacebookList = props => (
  <View>
      <Text
        onPress={props.initializeFb}
      >Hurah</Text>
     
  </View>
);

FacebookList.propTypes = {
  initializeFb: PropTypes.func,
  isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isLoading: AuthSelectors.isLoading(state)
})
 
const mapDispatchToProps = (dispatch) => ({
  initializeFb: () => dispatch(AuthActions.initializeFb())
})

export default connect(mapStateToProps, mapDispatchToProps)(FacebookList)
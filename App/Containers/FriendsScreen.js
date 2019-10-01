import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { GameplaySelectors } from '../Redux/GameplayRedux'

// Styles
import styles from './Styles/GameplayScreenStyle'

class FriendsScreen extends Component {



  renderFriendsList = () => <View>Friends </View>

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>FriendsList</Text>
          { this.renderFriendsList() }
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  round: GameplaySelectors.getRound(state),
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)

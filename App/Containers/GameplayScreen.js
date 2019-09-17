import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import { GameplaySelectors } from '../Redux/GameplayRedux'

// Styles
import styles from './Styles/GameplayScreenStyle'

class GameplayScreen extends Component {



  renderRound = () => <Text>Round { this.props.round }</Text>

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>GameplayScreen</Text>
          { this.renderRound() }
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

export default connect(mapStateToProps, mapDispatchToProps)(GameplayScreen)

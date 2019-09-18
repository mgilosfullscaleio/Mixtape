import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView , View, Image} from 'react-native'
import { connect } from 'react-redux'

import { GameplaySelectors } from '../Redux/GameplayRedux'

// Styles
import styles from './Styles/GettingStartedStyle'
import AppIntroSlider from 'react-native-app-intro-slider';


const slides = [
    {
      key: 'somethun',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../../assets/1.jpeg'),
      backgroundColor: '#b53737',
    },
    {
      key: 'somethun-dos',
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../../assets/2.jpeg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'somethun1',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../../assets/3.jpeg'),
      backgroundColor: '#22bcb5',
    }
  ];

class GameplayScreen extends Component {

    state = {
        showRealApp: false
    }

    _renderItem = ({ item }) => {
        return (
          <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
      }
  render () {

    if (this.state.showRealApp) {
        return <Text>Hurah</Text>;
    } else {
        return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} showSkipButton={true}/>;
    }
    
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

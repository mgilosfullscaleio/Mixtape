import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Spotify from 'rn-spotify-sdk'

var scopes = [
                'user-modify-playback-state',
                'user-read-currently-playing',
                'user-read-playback-state',
                'user-library-modify',
                'user-library-read',
                'playlist-read-private',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-read-recently-played',
                'user-top-read',
                'app-remote-control',
                'streaming'
              ];

const credentials = {
  clientId: 'dbee7dba4c8a44898d685c7ebac76c17',
  clientSecret: '0647bf0336354ec0b475d6245df4c953',
  redirectUri: Platform.OS === 'android' ? 'com.mixtape.mobileapp://oauth' : 'mixtape://',
}
// initialize spotify
const spotifyOptions = {
  "clientID":credentials.clientId,
  "sessionUserDefaultsKey":"SpotifySession",
  "redirectURL":credentials.redirectUri,
  "scopes":scopes,
};

const initializeSpotifyIfNeeded = async () => {
  const Debug = message => arg => {
    console.log(`${message}: ${arg}`);
    return arg;
  }
  return Spotify.isInitializedAsync()
    .then(init => 
      init || Spotify.initialize(spotifyOptions).then(Debug('Spotify.initialize'))
    )
    .then(Debug('initialize'))
    .then(isInitialized => 
      Spotify.login(spotifyOptions).then(Debug('Spotify.login'))
    )
    .then(Debug('loggedIn'))
    .catch(error => {
      console.log('initializeSpotifyIfNeeded Error', error);
      return false;
    });
}

// Styles
import styles from './Styles/LoginWithSpotifyScreenStyle'

class LoginWithSpotifyScreen extends Component {
  
  render () {
    const Debug = message => arg => {
      console.log(`${message}:`, arg);
      return arg;
    }

    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <TouchableOpacity onPress={async () => { 
            await initializeSpotifyIfNeeded()
            const spotifyAccount = Spotify.getMe().then(object => object).then(Debug('Spotify'))
            //console.log('spotifyAccount: ', spotifyAccount)
          }}
            style={{ marginTop: 300, borderRadius:50, alignSelf: 'center', justifyContent: 'center', width: 320, height: 55, backgroundColor: '#1DB954'}}>
              <Text style={{ color: 'white', alignSelf: 'center', fontSize: 25, }}> Spotify </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithSpotifyScreen)

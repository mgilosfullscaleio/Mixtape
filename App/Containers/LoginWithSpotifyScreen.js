import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import firebase from 'react-native-firebase'

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

  constructor(props) {
    super(props);

    console.log("CROWN radar:",this.props);
    // notifications
    this.onNotificationDisplayedListener = this.onNotificationDisplayedListener.bind(this);
    this.onNotificationListener = this.onNotificationListener.bind(this);
    this.onNotificationOpenedListener = this.onNotificationOpenedListener.bind(this);

  }

  async componentDidMount() {
    this.checkNotificationPermission();

    if (!!!this.notificationDisplayedListener) {
      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed(this.onNotificationDisplayedListener);
    }
    if (!!!this.notificationListener) {
      this.notificationListener = firebase.notifications().onNotification(this.onNotificationListener);
    }
    if (!!!this.notificationOpenedListener) {
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened(this.onNotificationOpenedListener);
    }

    try {
      const notificationOpen = await firebase.notifications().getInitialNotification();

      if (notificationOpen) {
          const action = notificationOpen.action;
          const notification = notificationOpen.notification;
          console.log('getFirebaseInitialNotification ' , notificationOpen, notification);
      }
    }
    catch (e) {
      console.log('getFirebaseInitialNotification ERROR ---> ', e);
    }

    if (!!!this.onTokenRefreshListener) {
      this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        console.log('onFirebaseTokenRefresh', fcmToken);
        this.getPushToken()
      });
    }

    if (!!!this.messageListener) {
      this.messageListener = firebase.messaging().onMessage((message) => {
        // Process your message as required
        console.log('onFirebaseMessage', message);
        Alert.alert('REMOTE PUSH NOTIFICATION', message.data)
      });
    }
  }

  async checkNotificationPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getPushToken()
    }
    else {
      await this.requestNotificationPermission()
    }
  }

  async requestNotificationPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getPushToken();
    } catch (error) {
        // User has rejected permissions
        console.log('requestPermission ---> ', error);
    }
  }
  
  getPushToken() {
    setTimeout(async () => {
      try {
        const token = await firebase.messaging().getToken();

        console.log('token', token);
      }
      catch (e) {
        console.log('getPushToken() ERROR ---> ', e);
      }
    }, 500)
  }

  onNotificationListener(notification) { 
    if (!!notification) {
      console.log('receivedPushNotif: ', notification)
    }
  }

  onNotificationOpenedListener(notificationOpen) {
    const action = notificationOpen.action;
    const notification = notificationOpen.notification;
    this.onNotificationListener(notification)
  }

  onNotificationDisplayedListener(notification) {
    this.onNotificationListener(notification)
  }
  
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

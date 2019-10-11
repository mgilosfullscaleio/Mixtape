import React from 'react'
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';

// const styles = StyleSheet

const createSafeAreaView = Component => props => (
    <>
        <StatusBar hidden backgroundColor={colors.black} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <Component {...props} />
        </SafeAreaView>
        <SafeAreaView style={{ flex: 0, height: getBottomSpace() + 2, backgroundColor: 'black', marginTop: -2 }}
        />
    </>
);

export default createSafeAreaView;
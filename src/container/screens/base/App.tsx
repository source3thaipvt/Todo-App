import { Text, StyleSheet, View, useColorScheme, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import Loading from '../../component/Loading'
import { Provider } from 'react-redux'
import store from '../../../redux/store'
import Todo from '../todo'

interface Props { }

const App = () => {
    const isDarkMode = useColorScheme() == 'dark'
 
    return (
        <Provider store={store}>
                <SafeAreaView style={styles.container}>
                    <StatusBar
                        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                        backgroundColor={'transparent'}
                    />
                    <Todo/>
                    <Loading />
                </SafeAreaView>
        </Provider>
    )
}

export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})



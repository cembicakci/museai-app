import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Lottie from 'lottie-react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Lottie source={require('../../assets/source/loading.json')} autoPlay loop style={styles.lottie} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'red',
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        zIndex: 999

    },
    lottie: {
        width: 90
    }
})
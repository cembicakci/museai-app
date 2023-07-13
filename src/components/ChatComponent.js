import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import Colors from '../helpers/Colors'

const { width, height } = Dimensions.get('screen')

const ChatComponent = ({ question, role }) => {
    return (
        <View style={[styles.container, { alignSelf: role === 'user' ? 'flex-end' : 'flex-start' }]}>
            <Text style={styles.message}>{question}</Text>
        </View>
    )
}

export default ChatComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: width * 0.7,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 4
    },
    message: {
        color: Colors.textMain,
        fontSize: 16,
        fontFamily: 'Lato-Regular'
    },
    time: {
        color: Colors.gray,
        fontSize: 12,
        fontFamily: 'Lato-Regular'
    }
})
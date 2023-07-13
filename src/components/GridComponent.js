import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Colors from '../helpers/Colors'

const GridComponent = ({ route }) => {

    const { description } = route?.params

    return (
        <ScrollView style={styles.infoBottom}>
            <Text style={styles.description}>
                {description}
            </Text>

            <View style={{ height: 100 }} />
        </ScrollView>
    )
}

export default GridComponent

const styles = StyleSheet.create({
    infoBottom: {
        padding: 16,
        backgroundColor: Colors.white,
        height: '100%'
    },
    description: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        lineHeight: 24
    }
})
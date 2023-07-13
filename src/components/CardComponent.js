import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Colors from '../helpers/Colors'

const CardComponent = ({ image, name, location, id }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={[styles.container]} onPress={() => { navigation.navigate('DetailScreen', { id, name }) }}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.info}>
                <Text numberOfLines={1} style={styles.name}>{name}</Text>
                <Text style={styles.address}>{location}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardComponent

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width * 0.9,
        marginRight: 4,
        marginBottom: 30,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    info: {
        padding: 14,
        borderWidth: 0.2,
        borderColor: Colors.gray
    },
    name: {
        fontFamily: 'Bodoni-Bold',
        fontSize: 22,
        marginBottom: 8
    },
    address: {
        fontFamily: 'Janson-Regular',
        fontSize: 14,
        fontWeight: '300',
        color: Colors.gray
    }
})
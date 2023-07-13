import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Colors from '../helpers/Colors'
import Network from '../helpers/Network'

import { SearchIcon } from '../../assets/svg'
import { useNavigation } from '@react-navigation/native'

const ExploreScreen = () => {

    const navigation = useNavigation()

    const [data, setData] = useState({})
    const [text, setText] = useState('')

    const mountData = async () => {
        const response = await Network.get('search/museums')
        setData(response)
    }

    useEffect(() => {
        mountData()
    }, [])

    const handleFilter = async () => {
        if (text) {
            const response = await Network.get(`search/get?text=${text}`)
            setData(response)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Ara...'
                    value={text}
                    onChangeText={(text) => setText(text)}
                    onChange={() => { handleFilter() }}

                />
                <View style={styles.icon}>
                    <SearchIcon />
                </View>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {

                        const borderFirst = index === 0 && 6
                        const borderLast = index === (data.length - 1) && 6

                        return (
                            <TouchableOpacity
                                style={[styles.card,
                                {
                                    borderTopLeftRadius: borderFirst,
                                    borderTopRightRadius: borderFirst,
                                    borderBottomLeftRadius: borderLast,
                                    borderBottomRightRadius: borderLast
                                }]}
                                activeOpacity={0.8}
                                onPress={() => { navigation.navigate('DetailScreen', { id: item.id, name: item.name }) }}
                            >
                                <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        padding: 16,
        paddingLeft: 48,
        backgroundColor: '#fff',
        borderColor: '#bdbdbd',
    },
    content: {
        flex: 1,
        paddingHorizontal: 8
    },
    card: {
        backgroundColor: Colors.primary,
        marginVertical: 4,
        padding: 12
    },
    text: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontSize: 14
    },
    inputContainer: {
        justifyContent: 'center'
    },
    icon: {
        position: 'absolute',
        left: 0,
        padding: 14
    }
})
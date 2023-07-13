import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, FlatList, Button } from 'react-native'

import { useDispatch } from 'react-redux'

import BottomSheet from "react-native-gesture-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../helpers/Colors'
import { ArrowDownIcon } from '../../assets/svg/ArrowDownIcon'
import { changeUser } from '../redux/slices/userSlice';
import Network from '../helpers/Network';

const LoginScreen = () => {

    const bottomRef = useRef()

    const [cities, setCities] = useState([])

    const [name, setName] = useState('')
    const [lastName, setLastname] = useState('')
    const [country, setCountry] = useState()

    const dispatch = useDispatch()

    const mountData = async () => {
        const response = await Network.get('search/cities')
        setCities(response)
    }

    useEffect(() => {
        mountData()
    }, [])


    const handleSubmit = async () => {

        const user = {
            name,
            lastName,
            country
        }

        console.log(user)

        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            if (user.name) {
                console.log(user)
                dispatch(changeUser({ state: 'login', data: true }))
                dispatch(changeUser({ state: 'user', data: user }))
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={[styles.container]}>
            <ImageBackground
                source={require('../../assets/img/monalisa.jpeg')}
                style={styles.image}
            >
                <View style={styles.overlay}></View>
            </ImageBackground>

            <View style={styles.content}>
                <View>
                    <Text style={styles.appName}>MUSEAI</Text>
                </View>

                <View style={styles.item}>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                        placeholder='İsim Giriniz'
                        placeholderTextColor={'#000'}
                    />
                </View>

                <View style={styles.item}>
                    <TextInput
                        value={lastName}
                        onChangeText={(text) => setLastname(text)}
                        style={styles.input}
                        placeholder='Soyisim Giriniz'
                        placeholderTextColor={'#000'}
                    />
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={styles.input} onPress={() => {
                        bottomRef.current.show()
                    }}>
                        <Text style={styles.text}>{country ? country : 'Şehir Seçiniz'}</Text>
                        <ArrowDownIcon />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSubmit()
                    }}
                >
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 12 }}>
                    <Button title='Devam Et' onPress={() => {
                        dispatch(changeUser({ state: 'login', data: true }))
                        dispatch(changeUser({ state: 'user', data: null }))
                    }} />
                </View>
            </View>

            <BottomSheet ref={bottomRef} height={500} hasDraggableIcon>
                <View style={{ paddingVertical: 12 }}>
                    <FlatList
                        data={cities}
                        keyExtractor={(_, index) => index}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        renderItem={({ item, index }) => {

                            const bgColor = index % 2 === 0 ? '#ddd' : '#fff'

                            return (
                                <TouchableOpacity
                                    style={[styles.modalBtn, { backgroundColor: bgColor }]}
                                    onPress={() => {
                                        setCountry(item)
                                        bottomRef.current.close()

                                    }}
                                    key={index}
                                >
                                    <Text style={styles.modalText}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </BottomSheet>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        opacity: 0.3
    },
    overlay: {
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 30,
        marginBottom: 6,
        textAlign: 'center'
    },
    content: {
        position: 'absolute',
        width: '100%',
        padding: 20
    },
    appName: {
        fontFamily: 'Bodoni-Bold',
        fontSize: 34,
        marginBottom: 6,
        textAlign: 'center'
    },
    item: {
        width: '100%',
        marginVertical: 12
    },
    text: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: '#000'
    },
    input: {
        height: 52,
        borderWidth: 1,
        padding: 14,
        borderColor: '#000',
        borderRadius: 4,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
    },
    modalBtn: {
        padding: 16
    },
    modalText: {}
})
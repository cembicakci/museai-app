import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialTabNavigation from '../navigations/MaterialTabNavigation'

import Colors from '../helpers/Colors'
import Network from '../helpers/Network'

import { SpeakerIcon } from '../../assets/svg'

import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('screen')

const DetailScreen = ({ route }) => {

    const navigation = useNavigation()

    const { id, name } = route?.params

    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [sound, setSound] = useState();
    const [stop, setStop] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            title: name === '' ? 'Detay' : name
        })

        mountData()
    }, [])

    const mountData = async () => {
        const response = await Network.get(`museum/${id}`)
        setData(response)
        setLoading(false)
    }

    const renderDot = ({ index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.dot, index === activeIndex && styles.activeDot]}
                onPress={() => setActiveIndex(index)}
            />
        );
    };

    const listenSound = async () => {

        if (!stop) {
            console.log('Loading Sound');
            console.log(data.audio)
            const { sound } = await Audio.Sound.createAsync({ uri: data.audio })
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
        } else {
            await sound.stopAsync()
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound])

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} horizontal={false}>
            <FlatList
                data={data?.files}
                keyExtractor={(item) => item.id}
                horizontal={true}
                snapToInterval={width}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <Image source={{ uri: item.location }} style={styles.image} />
                    )
                }}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                    setActiveIndex(newIndex);
                }}
            />

            <View style={styles.dotContainer}>
                {data?.files.map((_, index) => renderDot({ index }))}
            </View>

            <View style={styles.infoTop}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.location}>{data.city}</Text>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                    listenSound()
                    setStop(stop => !stop)
                }}>
                    <SpeakerIcon color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={{ height: height * 0.80 }}>
                {
                    <MaterialTabNavigation description={data.info} id={id} />
                }
            </View>

        </ScrollView>
    )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white
    },
    image: {
        width: width,
        height: height * 0.3,
        resizeMode: 'cover'
    },
    infoTop: {
        paddingHorizontal: 16,
        marginVertical: 12,
        flexDirection: 'row'
    },
    infoBottom: {
        padding: 16
    },
    name: {
        fontFamily: 'Bodoni-Bold',
        fontSize: 24,
        marginBottom: 20
    },
    location: {
        fontSize: 16,
        color: Colors.primary,
        fontStyle: 'italic',
        marginBottom: 12

    },
    year: {
        fontSize: 16,
        color: Colors.textMain,
        fontFamily: 'Janson-Regular',
        fontStyle: 'italic',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#333',
    },
})
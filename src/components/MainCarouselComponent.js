import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import Svg, { Rect } from 'react-native-svg'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient'

import Colors from '../helpers/Colors'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const { width, height } = Dimensions.get('screen')

const SPACING = 10
const ITEM_SIZE = width * 0.80
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2

const MainCarouselComponent = ({ data }) => {

    const navigation = useNavigation()

    const { user } = useSelector(x => x.user)

    if (!data) {
        return;
    }

    const [userInfo, setUserInfo] = useState({})

    const scrollX = useRef(new Animated.Value(0)).current

    const array = [{ key: 'left-spacer' }, ...data, { key: 'right-spacer' }]

    const Backdrop = ({ data, scrollX }) => {
        return (
            <View style={styles.backdrop}>
                <FlatList
                    data={data}
                    keyExtractor={(_, index) => index}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                        if (!item.id) return null;

                        const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE]
                        const translateX = scrollX.interpolate({
                            inputRange,
                            outputRange: [-width, 0]
                        })
                        return (
                            <MaskedView
                                key={index}
                                style={{ position: 'absolute' }}
                                maskElement={
                                    <AnimatedSvg
                                        width={width}
                                        height={height}
                                        viewBox={`0 0 ${width} ${height}`}
                                        style={{ transform: [{ translateX }] }}
                                    >
                                        <Rect x='0' y='0' width={width} height={height} fill={'red'} />
                                    </AnimatedSvg>
                                }
                            >
                                <Image source={{ uri: item.files[0].location }} style={styles.backdropImage} />
                            </MaskedView>
                        )
                    }}
                />
                <LinearGradient colors={['transparent', 'white']}
                    style={{ width: width, height: height * 0.6, position: 'absolute', bottom: 0 }} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Backdrop data={array} scrollX={scrollX} />
            <Animated.FlatList
                data={array}
                keyExtractor={(_, index) => index}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                snapToInterval={ITEM_SIZE}
                decelerationRate={0}
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16} //16 fps
                renderItem={({ item, index }) => {

                    if (!item.id) {
                        return <View style={{ width: SPACER_ITEM_SIZE }} />
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE, //prev item
                        (index - 1) * ITEM_SIZE, //curr item
                        (index) * ITEM_SIZE //next item
                    ]
                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100]
                    })

                    return (
                        <TouchableOpacity style={{ width: ITEM_SIZE, paddingBottom: 100 }} key={index} onPress={() => { navigation.navigate('DetailScreen', { id: item.id, name: item.name }) }}>
                            <Animated.View
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING,
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    transform: [{ translateY }],
                                    borderRadius: 18
                                }}
                            >
                                <Image source={{ uri: item?.files[0]?.location }} style={styles.image} />
                                <Text style={styles.text}>{item.name}</Text>
                                <Text style={styles.location}>{item.city}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default MainCarouselComponent

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: '100%',
        height: ITEM_SIZE,
        resizeMode: 'cover',
        borderRadius: 12,
        margin: 0,
        marginBottom: 10,
    },
    text: {
        fontFamily: 'Bodoni-Bold',
        fontSize: 22,
        marginBottom: 8
    },
    location: {
        fontFamily: 'Janson-Regular',
        fontSize: 14,
        fontWeight: '300',
        color: Colors.gray
    },
    backdrop: {
        position: 'absolute',
        width: width,
        height: height * 0.6
    },
    backdropImage: {
        width: width,
        height: height * 0.6,
        resizeMode: 'cover'
    }
})
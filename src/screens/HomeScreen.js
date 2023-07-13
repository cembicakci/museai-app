import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, LogBox, ScrollView, StyleSheet, View } from 'react-native'

import { useSelector } from 'react-redux';

import Colors from '../helpers/Colors'
import Network from '../helpers/Network'

import CardComponent from '../components/CardComponent'
import CarouselComponent from '../components/CarouselComponent'
import MainCarouselComponent from '../components/MainCarouselComponent'
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

    const [userInfo, setUserInfo] = useState({})

    const [homepageSlider, setHomepageSlider] = useState([])
    const [newMuseums, setNewMuseums] = useState([])
    const [editorMuseums, setEditorMuseums] = useState([])
    const [endingMuseums, setEndingMuseums] = useState([])
    const [processMuseums, setProcessMuseums] = useState([])

    const [loading, setLoading] = useState(true)

    const { user } = useSelector(x => x.user)

    useEffect(() => {
        LogBox.ignoreLogs(["ExceptionsManager.js:158 VirtualizedLists should never be nested inside plain ScrollViews "])
        LogBox.ignoreLogs(["Constants.platform.ios.model has been deprecated"])

        mountData()
    }, [])


    const mountData = async () => {
        await AsyncStorage.getItem('user')
            .then(async (r) => {
                const userInfo = JSON.parse(r)

                if (userInfo) {
                    const response = await Network.get(`homepage/${userInfo.country}`)
                    setHomepageSlider(response)
                } else {
                    const response = await Network.get('homepage/Istanbul')
                    setHomepageSlider(response)
                }

                const response2 = await Network.get('homepage/new/museums')
                setNewMuseums(response2)

                const response3 = await Network.get('homepage/editor/museums')
                setEditorMuseums(response3)

                const response4 = await Network.get('homepage/ending/museums')
                setEndingMuseums(response4)

                const response5 = await Network.get('homepage/process/museums')
                setProcessMuseums(response5)

            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} horizontal={false} >
            <MainCarouselComponent data={homepageSlider} />
            <CarouselComponent data={newMuseums} title={'Yeni Müzeler'} />
            <CarouselComponent data={editorMuseums} title={'Editörün Seçtikleri'} />
            <CarouselComponent data={endingMuseums} title={'Bitmek Üzere Olanlar'} />
            <CarouselComponent data={processMuseums} title={'Devam Edenler'} />
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1
    }
})
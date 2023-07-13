import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../redux/slices/userSlice';

import LoginNavigation from './LoginNavigation';
import BottomNavigation from './BottomNavigation';

const AppNavigation = () => {

    const dispatch = useDispatch()

    const { login } = useSelector(x => x.user)

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                dispatch(changeUser({ state: 'login', data: true }))
                dispatch(changeUser({ state: 'user', data: JSON.parse(value) }))
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <NavigationContainer>
            {
                login ? <BottomNavigation /> : <LoginNavigation />
            }
        </NavigationContainer>
    );
}

export default AppNavigation
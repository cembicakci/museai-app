import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogoutIcon } from '../../assets/svg'

import Colors from '../helpers/Colors';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

import { useDispatch } from 'react-redux'
import { changeUser } from '../redux/slices/userSlice';

const Stack = createNativeStackNavigator();

const Tab1Navigation = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        AsyncStorage.clear()
        dispatch(changeUser({ state: 'login', data: false }))
        dispatch(changeUser({ state: 'user', data: null }))
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'MUSEAI',
                    headerTitleStyle: {
                        color: Colors.textMain,
                        fontFamily: 'Bodoni-Bold',
                        fontSize: 22,
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => {
                                handleLogout()
                            }}>
                                <LogoutIcon color={Colors.primary} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{
                    headerTitleStyle: {
                        color: Colors.textMain,
                        fontFamily: 'Bodoni-Bold',
                        fontSize: 20
                    },
                    headerTintColor: Colors.primary
                }}
            />
        </Stack.Navigator>
    );
}

export default Tab1Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/ExploreScreen';
import DetailScreen from '../screens/DetailScreen';
import Colors from '../helpers/Colors';

const Stack = createNativeStackNavigator();

const Tab2Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ExploreScreen"
                component={ExploreScreen}
                options={{
                    headerTitle: 'Kesfet',
                    headerTitleStyle: {
                        color: Colors.textMain,
                        fontFamily: 'Bodoni-Bold',
                        fontSize: 22
                    },
                    headerTintColor: Colors.primary,
                }}
            />
            <Stack.Screen
                name="DetailScreen"
                component={DetailScreen}
                options={{
                    headerTitleStyle: {
                        color: Colors.textMain,
                        fontFamily: 'Bodoni-Bold',
                        fontSize: 22
                    },
                    headerTintColor: Colors.primary,
                }}
            />
        </Stack.Navigator>
    );
}

export default Tab2Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tab1Navigation from './Tab1Navigation';
import Tab2Navigation from './Tab2Navigation';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import { HomeIcon, ExploreIcon } from '../../assets/svg';
import Colors from '../helpers/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Tab1Navigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused ? <HomeIcon color={Colors.primary} /> : <HomeIcon />
                    )
                }}
            />
            <Tab.Screen
                name="Explore"
                component={Tab2Navigation}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused ? <ExploreIcon color={Colors.primary} /> : <ExploreIcon />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNavigation
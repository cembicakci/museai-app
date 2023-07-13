import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { GridIcon, HelpIcon, MessageIcon } from '../../assets/svg';

import GridComponent from '../components/GridComponent';
import AskComponent from '../components/AskComponent';

const Tab = createMaterialTopTabNavigator();

const MaterialTabNavigation = ({ description, id }) => {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Grid"
                component={GridComponent}
                initialParams={{ description }}
                options={{
                    tabBarIcon: () => {
                        return <GridIcon />
                    },
                    tabBarShowLabel: false
                }} />
            <Tab.Screen
                name="Ask"
                component={AskComponent}
                initialParams={{ id }}
                options={{
                    tabBarIcon: () => {
                        return <MessageIcon />
                    },
                    tabBarShowLabel: false
                }} />
        </Tab.Navigator>
    );
}

export default MaterialTabNavigation

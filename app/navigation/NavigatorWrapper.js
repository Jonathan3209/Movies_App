import React from 'react'
import {  Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Movies from '../containers/Movies'
import Watchlists from '../containers/Watchlists'
import AppColors from '../constants/AppColors';


const NavigatorWrapper = () => {

    const BottomTab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <BottomTab.Navigator>
                <BottomTab.Screen
                    name="Movies"
                    component={Movies}
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={focused ? styles.focused : styles.notFocused }>{'MOVIES'}</Text>,
                        tabBarIcon: ({ focused, size }) => (
                            <MaterialCommunityIcons type="MaterialCommunityIcons" name="movie"
                                color={focused ? AppColors.BLACK : AppColors.GRAY1} size={focused ? size + 2 : size} />
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="Watchlists"
                    component={Watchlists}
                    options={{
                        tabBarLabel: ({ focused }) => <Text style={focused ? styles.focused : styles.notFocused }>{'WATCHLIST'}</Text>,
                        tabBarIcon: ({ focused, size }) => (
                            <MaterialCommunityIcons type="MaterialCommunityIcons" name="format-list-bulleted-square"
                                color={focused ? AppColors.BLACK : AppColors.GRAY1} size={focused ? size + 2 : size} />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    )
}

export default NavigatorWrapper

const styles = StyleSheet.create({
    focused:{
        color: AppColors.BLACK,
        fontWeight: 'bold',
    },
    notFocused:{
        color: AppColors.GRAY1,
        fontWeight: 'bold',
    },
  });

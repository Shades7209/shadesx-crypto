import React from 'react'
import {Tabs} from "expo-router"
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const _Layout = () => {
    return (
        <>

            <Tabs
                screenOptions={{
                    headerShown: false,



                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 24,
                        marginHorizontal: 10,

                        height: 70,
                        paddingBottom: 10,
                        paddingTop: 10,

                        backgroundColor: '#161F2A',
                        borderRadius: 24,

                    },

                    tabBarActiveTintColor: '#5ED5A8',
                    tabBarInactiveTintColor: '#777777',
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={22} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="Market"
                    options={{
                        title: 'Markets',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="rupee" size={22} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Trades"
                    options={{
                        title: 'Trades',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome6 name="chart-simple" size={22} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Wallet"
                    options={{
                        title: 'Wallet',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="wallet" size={22} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Activity"
                    options={{
                        title: 'Activity',
                        tabBarIcon: ({ color }) => (
                            <Feather name="activity" size={22} color={color} />
                        ),
                    }}
                />



            </Tabs></>
    )
}
export default _Layout

import 'react-native-reanimated';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import "./global.css"
import SignIn from "@/app/sign-in";
import {AuthProvider} from "@/Context/AuthContext";

import { Canvas } from '@shopify/react-native-skia';
import 'expo-router/entry';



export default function RootLayout() {
    return(

    <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    </GestureHandlerRootView>
    )




}
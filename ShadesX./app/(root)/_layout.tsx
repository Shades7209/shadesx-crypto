import {Redirect, router, Slot} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {Text,ActivityIndicator} from "react-native";
import {useAuth} from "@/Context/AuthContext";


export default function Layout() {
    const {user,loading} = useAuth();

    if (loading) {
        return <ActivityIndicator/>
    }
    if(!user){
       return <Redirect href={"/sign-in"}/>
    }
    return <Slot/>
}

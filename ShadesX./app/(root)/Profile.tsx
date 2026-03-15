import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "@/Context/AuthContext";
import Entypo from '@expo/vector-icons/Entypo';
import {router} from "expo-router";

const Profile = () => {
    const {user,logout} = useAuth();
    return (
        <SafeAreaView className={"bg-[#161C22] h-full px-[28px]"}>
            <TouchableOpacity onPress={()=>router.back()}>
                <Entypo name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <View className={"items-center justify-center h-full bottom-11"}>
                <View className={"size-[100px] rounded-full  bg-white"}>
                </View>
                <View className={"w-full pt-[30px]"}>
                    <View className={"h-[40px] w-full  border border-white rounded-[16px] justify-center px-[10px]"}>
                        <Text className={"text-white font-bold"}>{user?.email}</Text>
                    </View>

                </View>
                <View className={"w-full pt-[30px]"}>
                    <View className={"h-[40px] w-full  border border-white rounded-[16px]"}></View>

                </View>
                <View className={"w-full pt-[20px] "}>
                    <TouchableOpacity className={"w-full h-[50px] rounded-[16px] bg-red-600 items-center justify-center"} onPress={()=>{
                        logout()
                        router.back()
                    }}>
                        <Text className={"text-white font-bold"}>LOGOUT</Text>


                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}
export default Profile

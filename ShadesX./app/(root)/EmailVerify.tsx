import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation, useLocalSearchParams, router} from 'expo-router';
import SignIn from "@/app/sign-in";
import axios from "axios";


const EmailVerify = () => {
    const navigation = useNavigation();
    const [otp, setOTP] = React.useState<string>('');
    const {email} = useLocalSearchParams();
    const VerifyEmail = async () => {
        try{
            const responce = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`,{
                email: email,
                otp: otp,
            })


            const res = responce?.data?.message
            Alert.alert(String(res))
            router.push("/sign-in")

        }catch (error: any) {
            const er =
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message ||
                "Something went wrong";

            Alert.alert("Error", String(er));
        }

    }
    return (
        <SafeAreaView className={"bg-[#1B232A] h-full px-[24px]"}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Text>BACK</Text>

            </TouchableOpacity>
            <View className={"pt-[30px] gap-[20px]"}>
                <Text className={"text-white font-bold text-[25px]"}>Verify Your Email</Text>
                <Text className={"text-white font-semibold text-xs"}>Enter OTP Received on the Email below</Text>
                <View className={"bg-[#161C22] w-full h-[54px] rounded-[12px] justify-center px-[20px]"}>
                    <TextInput
                        value={otp}
                        onChangeText={setOTP}
                        maxLength={6}
                        keyboardType={"numeric"}
                        placeholder={"Enter OTP "}
                        style={{width:"100%",color:"#777777",fontSize:14}}
                        placeholderTextColor={"#777777"}


                    />
                </View>
                <View>
                    <TouchableOpacity className={"w-full h-[54px] items-center justify-center bg-[#5ED5A8] rounded-[16px]"}
                    onPress={VerifyEmail}
                    >
                        <Text className={"text-[18px] font-semibold"}>Verify</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    )
}
export default EmailVerify

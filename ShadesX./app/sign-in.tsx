import {View, Text, TouchableOpacity, TextInput, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import {SafeAreaView} from "react-native-safe-area-context";
import {Redirect, router, Slot, useNavigation} from "expo-router";
import axios from "axios";
import {useAuth} from "@/Context/AuthContext";



const SignIn = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const[showpassword,setShowpassword] = useState(true);
    const [loginMethod,setLoginMethod] = useState(true);
    const[phone,setPhone] = useState("");
    const[logintype,setLogintype] = useState(true);
    const {login} = useAuth();

    const register = async () =>{
        try {
            const response = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/auth/registeremail`, // backend URL
                {
                    email: email,
                    password: password,
                }
            );

            console.log(response.data)
            router.push({
                pathname: "/EmailVerify",
                params: {email:email},
            })

        } catch (error: any) {
            const er =
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message ||
                "Something went wrong";

            Alert.alert("Error", String(er));
        }

    }

    const login1 = async () =>{
        try{
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`,{
                email: email,
                password: password,
            })
            await login(response.data.token,response.data.user)
            router.replace("/")

        }catch (error: any) {
            const er =
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message ||
                "Something went wrong";

            Alert.alert("Error", String(er));

        }
    }



    const handlePress = () => {
        setShowpassword(!showpassword);
    }
    const changelogintype = () => {
        setLogintype(!logintype);
    }
    return (
       <SafeAreaView className={"bg-[#1B232A] h-full px-[24px]"}>
           <View className={"pt-[60px]"}>
               <View className={"h-[45px] w-full bg-[#161C22] rounded-[12px] flex flex-row justify-between items-center px-[4px]"}>
                   <TouchableOpacity className={"w-[179px]"} onPress={logintype?()=>{}:changelogintype}>
                       <View className={`bg-${logintype?"[#1B232A]":"[#161C22]"} h-[35.17px] rounded-[12px] items-center justify-center`}>
                           <Text className={"text-[#C1C7CD] text-[15px]"}>Sign-in</Text>

                       </View>
                   </TouchableOpacity>
                   <TouchableOpacity className={"w-[160px] "}onPress={logintype?changelogintype:()=>{}}>
                       <View className={`rounded-[12px] items-center justify-center bg-${logintype?"[#161C22]":"[#1B232A]"} h-[35.17px]`}>
                           <Text className={"text-[#C1C7CD] text-[15px]"}>Sign-up</Text>

                       </View>
                   </TouchableOpacity>

               </View>
               {logintype?<Text className={"pt-[40px] text-[32px] text-white font-bold"}>Sign in</Text>:<Text className={"pt-[40px] text-[32px] text-white font-bold"}>Sign up</Text>}
               <View className={"pt-[44px] flex flex-row justify-between"}>
                   {loginMethod ? <Text className={"text-[#A7AFB7]"}>Email</Text>:<Text className={"text-[#A7AFB7]"}>Phone</Text>}
                   <TouchableOpacity onPress={()=>{setLoginMethod(!loginMethod)}}>
                       {loginMethod
                           ?
                           (logintype?<Text className={"text-[#5ED5A8]"}>Sign in with phone</Text>:<Text className={"text-[#5ED5A8]"}>Register with phone</Text>)
                           :
                           (logintype?<Text className={"text-[#5ED5A8]"}>Sign in with email</Text>:<Text className={"text-[#5ED5A8]"}>Register with email</Text>)}
                   </TouchableOpacity>

               </View>
               <View className={"pt-[12px] "}>
                   <View className={"bg-[#161C22] w-full h-[54px] rounded-[12px] justify-center px-[20px]"}>
                       <TextInput
                           value={loginMethod?email:phone}
                           style={{width:"100%",color:"#777777",fontSize:14}}
                           placeholder={loginMethod?"Enter your email":"Enter your phone number"}
                           placeholderTextColor={"#777777"}
                           onChangeText={loginMethod?setEmail:setPhone}
                           keyboardType={loginMethod?"default":"numeric"}
                           maxLength={loginMethod?1000:10}




                       />
                   </View>


               </View>
               <View className={"pt-[30px]"}>
                   <Text className={"text-[#A7AFB7]"}>Password</Text>
                   <View className={"pt-[12px] "}>
                       <View className={"bg-[#161C22]  h-[54px] rounded-[12px]  px-[20px] flex flex-row  items-center"}>
                           <TextInput
                               value={password}
                               style={{width:"100%",color:"#777777",fontSize:14}}
                               placeholder={"Enter your Password"}
                               placeholderTextColor={"#777777"}
                               onChangeText={setPassword}
                               secureTextEntry={showpassword}




                           />
                           <TouchableOpacity className={"right-[16px]"} onPress={handlePress}>
                               <AntDesign name={showpassword?"eye-invisible":"eye"} size={24} color="#777777" />
                           </TouchableOpacity>
                       </View>



                   </View>
               </View>
               {logintype?<View className={"pt-[8px]"}>
                   <TouchableOpacity >
                       <Text className={"text-[#5ED5A8]"}>Forgot Password?</Text>

                   </TouchableOpacity>
               </View>:<></>}
               <View className={"pt-[40px]"}>
                   <TouchableOpacity className={"w-full h-[54px] items-center justify-center bg-[#5ED5A8] rounded-[16px]"}
                   onPress={logintype?login1:register}

                   >
                       {logintype?<Text className={"text-[18px] font-semibold"}>Sign in</Text>:<Text className={"text-[18px] font-semibold"}>Sign up</Text>}

                   </TouchableOpacity>

               </View>
               <View className={"pt-[20px] flex flex-row justify-between"}>
                   <View className={"w-[134px] border border-[#777777] h-[0px] opacity-[2%]"}></View>
                   <View className={"top-[-7px] px-[9px] "}>
                       {logintype?<Text className={"text-[#777777]"}>Or login with</Text>:<Text className={"text-[#777777]"}>Register with</Text>}
                   </View>
                   <View className={"w-[114px] border border-[#777777]  h-[0px] opacity-[2%]"}></View>


               </View>
               <View className={"pt-[20px] flex flex-row justify-between w-full"} >
                   <TouchableOpacity>
                       <View className={"w-[153px] h-[53px] bg-white rounded-[16px]"}>
                           <View className={"items-center h-full justify-center "}>
                               <Image
                                   style={{width:30,height:30}}
                                   source={require("../assets/Menu_Image/Facebook-Icon.png")}
                               />

                           </View>


                       </View>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <View className={"w-[153px] h-[53px] bg-white rounded-[16px]"}>
                           <View className={"items-center h-full justify-center "}>
                               <Image
                                   style={{width:30,height:30}}
                                   source={require("../assets/Menu_Image/Google-Icon.png")}
                               />

                           </View>



                       </View>
                   </TouchableOpacity>



               </View>
           </View>
       </SafeAreaView>
    )
}
export default SignIn

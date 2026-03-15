import {View, Text, TouchableOpacity, Image, useWindowDimensions, Alert} from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {router} from "expo-router";
import {useAuth} from "@/Context/AuthContext";


const Menu = () => {
    const { width, height } = useWindowDimensions();
    const boxwidth = width / 4;
    const {user} = useAuth();

    return (
        <View className={"bg-[#161C2280] flex flex-row"}>
            <View className={"h-full"} style={{width:boxwidth}}>
                <TouchableOpacity className={" "} onPress={()=>{
                    router.push({
                        pathname: "/Deposit",
                        params:{id:user?._id}
                    })
                    

                }}>
                    <View className={"w-full h-[84px]  border-r-[0.2px] border-r-white/20 justify-center items-center gap-[10px]"}
                    >

                        <View style={{shadowColor:"#5ED5A8",backgroundColor:"transparent",shadowOpacity: 0.7,
                            shadowRadius: 6,
                            elevation: 6,}}>
                            <FontAwesome name="rupee" size={24} color="#5ED5A8" />

                        </View>
                        <Text className={"text-[#C1C7CD] font-semibold"}>Deposit</Text>

                    </View>
                </TouchableOpacity>


            </View>
            <View className={"h-full"} style={{width:boxwidth}}>
                <TouchableOpacity className={" "}>
                    <View className={"w-full h-[84px]  border-r-[0.2px] border-r-white/20 justify-center items-center gap-[10px] "}>

                        <View style={{shadowColor:"#5ED5A8",backgroundColor:"transparent",shadowOpacity: 0.7,
                            shadowRadius: 6,
                            elevation: 6,}}>
                            <Image
                                style={{width:24,height:24}}
                                source={require('../../assets/Menu_Image/Bitcoin Swap Icon.png')}

                            />

                        </View>
                        <Text className={"text-[#C1C7CD] font-semibold"}>Swap</Text>

                    </View>
                </TouchableOpacity>



            </View>
            <View className={"h-full"} style={{width:boxwidth}}>
                <TouchableOpacity className={" "}>
                    <View className={"w-full h-[84px]  border-r-[0.2px] border-r-white/20 justify-center items-center gap-[10px]"}
                    >

                        <View style={{shadowColor:"#5ED5A8",backgroundColor:"transparent",shadowOpacity: 0.7,
                            shadowRadius: 6,
                            elevation: 6,}}>
                            <Image
                                style={{width:24,height:24}}
                                source={require('../../assets/Menu_Image/Trading Chart.png')}

                            />

                        </View>
                        <Text className={"text-[#C1C7CD] font-semibold"}>Grid Trading</Text>

                    </View>
                </TouchableOpacity>


            </View>

            <View className={"h-full"} style={{width:boxwidth}}>

                <TouchableOpacity className={" "}>
                    <View className={"w-full h-[84px]  border-r-[0.2px] border-r-white/20 justify-center items-center gap-[10px] "}>

                        <View style={{shadowColor:"#5ED5A8",backgroundColor:"transparent",shadowOpacity: 0.7,
                            shadowRadius: 6,
                            elevation: 6,}}>
                            <Image
                                style={{width:24,height:24}}
                                source={require('../../assets/Menu_Image/More Icon from Flaticon.png')}

                            />

                        </View>
                        <Text className={"text-[#C1C7CD] font-semibold"}>More</Text>

                    </View>
                </TouchableOpacity>

            </View>


        </View>
    )
}
export default Menu

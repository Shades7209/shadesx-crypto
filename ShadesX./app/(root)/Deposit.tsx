import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useLocalSearchParams} from "expo-router";
import axios from "axios";



const Deposit = () => {
    const {id} = useLocalSearchParams()
    const [cb,setcb] = useState(0);
    const [a,seta] = useState("10")
    const MAX = 10000;


    useEffect(() => {
        try{
            const curentbalancefetch =  async ()=>{
                const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/wallet/currentBalancefetch`,{
                    id:id
                })
                setcb(res.data.user.balance)
            }
            curentbalancefetch()
        }catch(err){
            console.log(err)
        }

    }, []);

    const handleNumberPress = (digit: string) => {

        const next = a + digit;

        const num = Number(next);


        if (next.length > 1 && next.startsWith("0")) return;

        // block if exceeds max
        if (num > MAX) return;


        seta(next);
    };

    const Deposit = async () =>{
        try{
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/wallet/currentbalance`,{
                id:id,
                balance:Number(a)

            })
            try{
                 await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/transaction/transaction`, {
                    id:id,
                    type:"D",
                    status:"success",
                    amount:Number(a),
                    price:Number(a),
                    currency:"INR",
                    product:"INR"
                 });

            }catch(err){
                console.log(err)
            }
            Alert.alert(String(res.data.status))
            navigation.goBack()
        }catch (err){
            console.log(err)
            Alert.alert(String(err.message))
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/transaction/transaction`, {
                id:id,
                type:"D",
                status:"failed",
                amount:Number(a),
                price:Number(a),
                currency:"INR",
                product:"INR"
            });
        }
    }






    console.log(cb)
    const navigation = useNavigation();
    return (
        <SafeAreaView className={"bg-[#1B232A] h-full px-[24px] w-full"}>
            <View className={"w-full flex flex-row gap-[17px] items-center"}>
                <TouchableOpacity onPress={()=> navigation.goBack()} className={"size-[40px] rounded-full bg-[#161C22] items-center justify-center"}>
                    <Entypo name="chevron-left" size={28} color="white" />
                </TouchableOpacity>
                <Text className={"font-bold text-white text-[16px]"}>Deposit INR</Text>
            </View>
            <View className={"pt-[54px] w-full items-center"}>
                <Text className={"text-white font-semibold"}>
                    Enter amount in INR
                </Text>
                <View className={"pt-[12px] flex flex-row gap-[10px] items-center"}>
                    <FontAwesome name="rupee" size={50} color="white" />

                    <Text className={"text-white font-bold text-[48px]"}>{Number(a).toLocaleString("en-IN")}</Text>
                </View>
                <Text className={"pt-[38px] text-xs text-gray-400"}>
                    Min ₹1 - Max ₹10,000
                </Text>
                <Text className={"pt-[40px] font-bold text-white"}>
                    Current Balance :- ₹{cb}
                </Text>

            </View>
            <View className={"w-full pt-[60px] gap-[60px]"}>
                <View className={"flex flex-row justify-between w-full "}>
                    <TouchableOpacity onPress={()=>handleNumberPress("1")}>
                        <Text className={"text-[28px] text-white font-bold"}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("2")}>
                        <Text className={"text-[28px] text-white font-bold text-center"}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("3")}>
                        <Text className={"text-[28px] text-white font-bold"}>3</Text>
                    </TouchableOpacity>
                </View>
                <View className={"flex flex-row justify-between w-full"}>
                    <TouchableOpacity onPress={()=>handleNumberPress("4")}>
                        <Text className={"text-[28px] text-white font-bold"}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("5")}>
                        <Text className={"text-[28px] text-white font-bold"}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("6")}>
                        <Text className={"text-[28px] text-white font-bold"}>6</Text>
                    </TouchableOpacity>
                </View>
                <View className={"flex flex-row justify-between w-full"}>
                    <TouchableOpacity onPress={()=>handleNumberPress("7")}>
                        <Text className={"text-[28px] text-white font-bold"}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("8")}>
                        <Text className={"text-[28px] text-white font-bold"}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("9")}>
                        <Text className={"text-[28px] text-white font-bold"}>9</Text>
                    </TouchableOpacity>
                </View>
                <View className={"flex flex-row justify-between w-full"}>
                    <TouchableOpacity >
                        <Text className={"text-[28px] text-white font-bold"}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handleNumberPress("0")}>
                        <Text className={"text-[28px] text-white font-bold left-2"}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        seta(prev => prev.slice(0, -1));
                    }}>
                        <Entypo name="erase" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <View className={"pt-[23px]"}>
                <TouchableOpacity className={"w-full rounded-[16px]  bg-[#5ED5A8] h-[59px] items-center justify-center"} onPress={Deposit}>
                    <Text className={"font-semibold text-[16px]"}>Deposit</Text>

                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}
export default Deposit

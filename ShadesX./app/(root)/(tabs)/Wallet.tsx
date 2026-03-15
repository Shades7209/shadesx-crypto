import {View, Text, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator} from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import CoinWallet from "@/components/CoinWallet";
import axios from "axios";
import { useAuth } from "@/Context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
const Wallet = () => {

    const [data, setData] = useState(null);
    const isFocused = useIsFocused();
    const { user } = useAuth();
    const [show,setShow] = useState(true);
    const[loading, setLoading] = useState(true);




    useEffect(() => {

        if (!isFocused || !user?._id) return;

        const fetchdata = async () => {
            try {
                const res = await axios.post(
                    `${process.env.EXPO_PUBLIC_API_URL}/wallet/fetchwallet`,
                    { id: user._id }
                );


                setData(res.data.wallet);

            } catch (err) {
                console.log("API ERROR:", err.response?.data || err.message);
            }finally {
                setLoading(false);
            }
        };


        fetchdata();


    }, [isFocused, user]);


    useEffect(() => {}, [data]);

    const totalbalance = data?.total.toLocaleString()

    if(loading){
        return <ActivityIndicator size={"large"}/>
    }







    return (
        <SafeAreaView className={"bg-[#161C22] h-full w-full px-[16px]"}>


            <View className={"pt-[20px]"}>
                <Text className={"text-[#777777] text-[13px]"}>Current Balance</Text>

                <View className={"flex flex-row justify-between w-full pt-[20px] items-center"}>
                    <Text className={"text-white font-bold text-[32px] text-center"} >
                        ₹{show?totalbalance ?? 0:".".repeat(totalbalance.length)}
                    </Text>
                    <TouchableOpacity onPress={() => setShow(!show)}>
                        <AntDesign name={show?"eye-invisible":"eye"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>


            <View className={"pt-[30px]"}>
                <View className={"flex flex-row justify-between w-full h-[38px]"}>

                    <TouchableOpacity className={"h-full bg-[#5ED5A8] items-center justify-center rounded-[8px] w-[116px]"}>
                        <Text className={"text-[#171D22]"}>Deposit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={"h-full bg-[#1E272E] items-center justify-center rounded-[8px] w-[116px]"}>
                        <Text className={"text-[#777777]"}>Withdraw</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className={"h-full bg-[#1E272E] items-center justify-center rounded-[8px] w-[116px]"}>
                        <Text className={"text-[#777777]"}>Transfer</Text>
                    </TouchableOpacity>

                </View>
            </View>


            <View className={"pt-[25px] w-full flex-1 "}>
                <FlatList
                    data={data?.wallet ?? []}
                    keyExtractor={(item) => item._id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CoinWallet
                            symbol={item.coin?.symbol}
                            logo={item.coin?.logo}
                            name={item.coin?.name}
                            balance={item.balance.toFixed(8)}
                            inr={data?.breakdown?.[item.coin?.symbol] ?? 0}

                        />
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

export default Wallet;

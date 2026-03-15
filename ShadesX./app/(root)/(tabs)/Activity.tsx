import {View, Text, FlatList, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import TransactionBox from "@/components/TransactionBox";
import axios from "axios";
import {useAuth} from "@/Context/AuthContext";
import { useIsFocused } from '@react-navigation/native';

const Activity = () => {

    const {user} = useAuth();
    const isFocused = useIsFocused();

    const [transactions,setTransactions] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try{
            const fetchTransaction = async () => {
                const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/transaction/fetchtransaction`,{
                    id:user?._id
                });
                setTransactions(res.data.re);
                console.log(res.data.re);


            }
            if(isFocused) fetchTransaction()
        }catch (err){
            console.log(err?.message);
        }finally {
            setLoading(false);
        }

    },[isFocused])

    if(loading){
        return <ActivityIndicator size={"large"}/>
    }

    return (
        <SafeAreaView className={"bg-[#161C22] h-full px-[10px] w-full"}>
            <View className={"pt-[20px] w-full items-center pb-[20px]"}>
                <Text className={"text-white font-bold"}>Recent Activity</Text>
            </View>

                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TransactionBox
                            date={item?.createdAt}
                            type={item?.type}
                            amount={item?.amount}
                            currency={item?.currency}
                            price={item?.price}
                            product={item?.product}
                            status={item?.status}
                            logo={item?.logo}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical:16}}

                />



        </SafeAreaView>
    )
}
export default Activity

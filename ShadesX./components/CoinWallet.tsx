import {View, Text, Image} from 'react-native'
import React from 'react'

const CoinWallet = ({logo,name,symbol,balance,inr}:{logo:string,name:string,symbol:string,balance:number,inr:number}) => {
    return (
        <View className={"flex flex-row justify-between border-b-[0.2px] border-b-[#fffefc14] h-[75px] pt-[10px] items-center"}>
            <View className={"flex flex-row gap-[10px] justify-center items-center"}>
                <Image
                style={{width:45,height:45,borderRadius:"100%"}}
                source={{uri:logo}}
                />
                <View className={" gap-[3px]"}>
                    <Text className={"text-white font-bold"}>{name}</Text>
                    <Text className={"text-[#777777]"}>{symbol}</Text>
                </View>
            </View>
            <View className={"justify-center gap-[3px]"}>
                <Text className={"text-right text-white font-bold"}>{balance}</Text>
                <Text className={"text-right text-[#777777]"}>₹{inr.toLocaleString()}</Text>
            </View>


        </View>
    )
}
export default CoinWallet

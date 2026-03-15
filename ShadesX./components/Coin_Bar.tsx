import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {router} from "expo-router";

const CoinBar = ({image,coinP,name,change,symbol,id}:{image:string,coinP:number,name:string,change:number,symbol:string,id:string}) => {
    const price = Number(coinP || 0).toLocaleString('en-IN');
    const sym = String(symbol||" ").toUpperCase()

    const handlePress= ()=>{
        router.push({
            pathname: "/CoinPage/[id]",
            params: {
                id: id,
                name: name,
                symbol: symbol,
                image:image,
                price:price
            }
        });
    }




    const chartImage = change > 0
        ? require('../assets/Menu_Image/Component 23.png')
        : require('../assets/Menu_Image/Component 23-red.png');
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className={"flex flex-row justify-between h-[81px]  items-center border-b border-b-[##f7fcf905]"}>
                <View className={"flex flex-row gap-[13px] items-center"}>
                    <Image
                        style={{width:40,height:40,}}
                        source={
                            image
                                ? { uri: image }
                                : require('../assets/Menu_Image/P2P Crypto Icon.png')
                        }
                    />
                    <View className={"w-[70px]"}>
                        <Text className={"font-bold text-white text-[12px]"}>{name}</Text>
                        <Text className={"text-[#777777] text-xs"}>{sym}</Text>

                    </View>

                </View>
                <View className={"justify-center"}>
                    <Image
                        style={{width:142,height:31,}}
                        source={chartImage}/>


                </View>
                <View>
                    <Text className={"text-white text-right"}>₹{price}</Text>
                    <Text
                        className="text-[12px] text-right"
                        style={{ color: change < 0 ? '#DD4B4B' : '#5ED5A8' }}
                    >
                        {change>0?"+":""}{Math.floor(change*100)/100}%
                    </Text>

                </View>
            </View>
        </TouchableOpacity>
    )
}
export default CoinBar

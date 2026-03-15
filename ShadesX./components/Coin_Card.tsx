import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const CoinCard = ({image,coinP,name,change,id,symbol}:{image:string,coinP:number,name:string,change:number,id:string,symbol:string}) => {

    const price = Number(coinP || 0).toLocaleString('en-IN');
    const name1 = String(name||" ").toUpperCase()


    const chartImage = change > 0
        ? require('../assets/Menu_Image/Component 23.png')
        : require('../assets/Menu_Image/Component 23-red.png');

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




    return (
        <View className={"left-[24px] size-auto m-[7px]"}>
            <TouchableOpacity className={" rounded-[16px] mr-[12px]"}
                              style={{shadowColor:"#7777",backgroundColor:"transparent",shadowOpacity: 1,
                                  shadowRadius: 6,
                                  elevation: 6,}}
                              onPress={handlePress}
            >
                <View className={"h-[118px] w-[163px] rounded-[16px] bg-white px-[12px] "}
                >
                    <View className={"pt-[10px] flex flex-row justify-between"}>
                        <Text
                            className="text-[16px] font-bold"
                            style={{ color: change < 0 ? '#DD4B4B' : '#16A34A' }}
                        >₹{price}</Text>
                        <Image
                            style={{width:24,height:24}}
                            source={
                                image
                                    ? { uri: image }
                                    : require('../assets/Menu_Image/P2P Crypto Icon.png')
                            }

                        />

                    </View>
                    <View className={"pt-[8px] flex flex-row items-center gap-[4px]"}>
                        <Text className={"text-[14px] text-[#1B232A]"}>{name1}/INR</Text>
                        <Text
                            className="text-[12px]"
                            style={{ color: change < 0 ? '#DD4B4B' : '#16A34A' }}
                        >
                            {change>0?"+":""}{Math.floor(change*100)/100}%
                        </Text>


                    </View>
                    <View className={"pt-[16px]"}>
                        <Image
                            style={{width:"100%",height:31}}
                            source={chartImage}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CoinCard

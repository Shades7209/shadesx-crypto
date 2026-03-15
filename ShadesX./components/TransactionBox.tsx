import {View, Text, Image} from 'react-native'
import React from 'react'

const TransactionBox = ({date,amount,price,status,currency,type,product,logo}:{date:string,amount:number,price:number,status:string,currency:string,type:string,product:string,logo:string}) => {
    const formatIST = (date:string) => {
        return new Date(date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };


    return (
        <View className={"pt-[20px] rounded-[20px] px-2"} style={{backgroundColor:status==="failed"?'#DD4B4B26':""}}>
            <View className={"w-full border-b-[0.2px] border-b-[#ffff] h-[85px]"}>
                <View className={"flex flex-row w-full"}>
                    <View className={"flex flex-row justify-between w-full"}>
                        <View className={"flex flex-row gap-[10px] "}>
                            <View className={"size-[50px] rounded-full items-center justify-center bottom-1"}
                                  style={{backgroundColor:type==='D'?'#5ED5A896':'#DD4B4B96'}}
                            >
                                {type==="C"?<Image
                                style={{width:50,height:50,}}
                                source={{uri:logo}}
                                />:<Text className={"text-[11px]"} style={{
                                    color:type==='D'?'#5ED5A8':'#DD4B4B'
                                }}>{type==="D"?"Deposit":"Withdraw"}</Text>}
                            </View>
                            <View className={"gap-[2px]"}>
                                <Text className={"text-left font-bold text-white"}>{product.toUpperCase()}/{currency}</Text>
                                <Text className={"text-left pt-[5px] text-[#777777]"}>Amount</Text>
                                <Text className={"text-left text-[#777777]"}>Price</Text>
                                <Text className={"text-left text-[#777777]"}>Status</Text>

                            </View>

                        </View>
                        <View className={"gap-[2px]"}>
                            <Text className={"text-right text-[#777777] text-xs"}>{formatIST(date)}</Text>
                            <Text className={"text-right pt-[8px]"}
                                  style={{
                                      color:status==='success'?type==='D'|| type==="C"?'#5ED5A8':'#DD4B4B':"#DD4B4B"
                                  }}
                            >{type==="C"?status==="success"?`+${amount.toFixed(8)}`:`-${amount.toFixed(8)}`:status==='failed'?`₹${amount}`:type==="D"?`+₹${amount}`:`-₹${amount}`}</Text>
                            <Text className={"text-right text-[#777777]"}>₹{price.toLocaleString()}</Text>
                            <Text className={"text-right"}
                                  style={{
                                      color:status==='success'?'#5ED5A8':'#DD4B4B'
                                  }}
                            >{status.toUpperCase()}</Text>
                        </View>

                    </View>

                </View>
            </View>
        </View>
    )
}
export default TransactionBox

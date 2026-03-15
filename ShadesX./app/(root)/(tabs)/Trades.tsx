import {View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';
import {
    CandlestickChart,
    CandlestickChartProvider,
} from "react-native-wagmi-charts";










const Trades = () => {
    const { width } = useWindowDimensions();
    const w = width / 6;

    const [usdt, setUsdt] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [BitcoinUSDT, setBitcoinUSDT] = useState<any>(null)
    const [selectedInterval, setSelectedInterval] = useState<string>("1");
    const [coin, setCoin] = useState<any | null>("BTC");
    const[display, setDisplay] = useState<any | null>("none");
    const[bids,setBids] = useState<any[]>([]);
    const[ask, setask] = useState<any []>([]);
    const[inr,setInr] = useState<any|null>(0);






    useEffect(()=>{
        const fetchusdt = async ()=>{
            try {
                const resp = await fetch(`${process.env.EXPO_PUBLIC_BYBIT_API_URL}/tickers?category=spot&symbol=${coin}USDT`);
                const resp1 = await fetch(`${process.env.EXPO_PUBLIC_BYBIT_API_URL}/kline?category=spot&symbol=${coin}USDT&interval=${selectedInterval}&limit=40`);
                const order = await fetch(`${process.env.EXPO_PUBLIC_BYBIT_API_URL}/orderbook?category=spot&symbol=${coin}USDT&limit=50`);
                const inrw = await fetch(`${process.env.EXPO_PUBLIC_FRANKFURTER_API_URL}?base=USD`);


                const json = await resp.json();
                setUsdt(json);
                const json1 = await resp1.json();
                setBitcoinUSDT(json1);
                const json2 = await order.json();
                setBids(json2.result.b);
                setask(json2.result.a);
                const json4 = await inrw.json();
                setInr(json4.rates.INR);


            }catch (e){
                console.log(e)
            }finally {
                setLoading(false);
            }
        }
        fetchusdt()
        const interval = setInterval(() => {
            fetchusdt();
        }, 1000);

        return () => clearInterval(interval);

    },[selectedInterval,coin])

    const formattedData =
        BitcoinUSDT?.result?.list
            ? [...BitcoinUSDT.result.list]   // copy
                .reverse()                   // oldest → newest
                .map((c: any[]) => ({
                    timestamp: Number(c[0]),
                    open: Number(c[1]),
                    high: Number(c[2]),
                    low: Number(c[3]),
                    close: Number(c[4]),
                }))
            : [];











    const [count, setCount] = useState(2)



    if(loading){

        return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;

    }
    const prices = formattedData.flatMap(c => [c.high, c.low]);
    const time = formattedData.flatMap(c => [c.timestamp]);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minTime = Math.min(...time)
    const maxTime = Math.max(...time);

    const steps = 6;
    const priceLevels = Array.from({ length: steps }, (_, i) =>
        (maxPrice - (i * (maxPrice - minPrice)) / (steps - 1)).toFixed(2)
    );

    const TimeLevels = Array.from({ length: steps }, (_, i) =>
        (minTime + (i * (maxTime - minTime)) / (steps - 1))
    );

    const formattedTimeLevels = TimeLevels.map(t =>
        new Date(t).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    );





    const timeinterval = ["1","5","15","30","60","D"]

    const handleIntervalPress = (p: string) => {
        setSelectedInterval(p);

    };

















    return (
        <View className={"size-full bg-white"}>
            <View className={"w-full h-[60px] bg-[#161C22]"}>

            </View>
            <View className={"bg-[#161C22] w-max h-[380px]"}>
                <View className={"px-[24px] pt-[20px]"}>
                    <View className={`w-full h-[46px] bg-[#1B232A] rounded-[12px] flex flex-row justify-between items-center px-[4px]`}>
                        <TouchableOpacity className={" h-[38px] w-[115px] rounded-[12px] items-center justify-center "} style={{backgroundColor:count===1?"#161C22":""}}  onPress={() => {setCount(1)}}>
                            <Text  style={{color:count===1?"#C1C7CD":"#777777",fontSize:count===1?14:11}}>Convert</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={"h-[38px] w-[115px] rounded-[12px] items-center justify-center "} style={{backgroundColor:count===2?"#161C22":""}} onPress={() => {setCount(2)}}>
                            <Text  style={{color:count===2?"#C1C7CD":"#777777",fontSize:count===2?14:11}}>Spot</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className={"h-[38px] w-[100px] rounded-[12px] items-center justify-center"} style={{backgroundColor:count===4?"#161C22":""}}  onPress={() => {setCount(4)}}>
                            <Text  style={{color:count===4?"#C1C7CD":"#777777",fontSize:count===4?14:11}}>Fiat</Text>
                        </TouchableOpacity>

                    </View>


                </View>
                <View>
                    <View className={"pt-[29px] px-[24px]"}>
                        <View className={"flex flex-row gap-[8px] items-center"}>
                            <Text className={"text-white font-bold text-[28px]"}>{count===2?
                                (usdt.result.list[0].lastPrice)*1

                                :count===4?(usdt.result.list[0].lastPrice*inr).toFixed(2):(usdt.result.list[0].lastPrice)*1}

                            </Text>
                            <Text className={"text-[16px]"}
                                  style={{color:usdt.result.list[0].price24hPcnt<0?"#DD4B4B":"#5ED5A8"}}>
                                {usdt.result.list[0].price24hPcnt>0?"+":""}
                                {(usdt.result.list[0].price24hPcnt)}%</Text>
                        </View>
                        <TouchableOpacity className={"pt-[4px]"} onPress={() => {
                            setDisplay(display==="flex"?"none":"flex")


                        }}>
                            <View className={"flex flex-row items-center gap-[3px] w-[96px] h-[24px]"}>
                                <AntDesign name="swap" size={24} color="#C1C7CD" />
                                <Text className={"text-[#C1C7CD] font-semibold"}>{coin}/{count===2?"USDT":(count===4?"INR":"USDT")}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View className={"w-[300px] h-[124px] "}>
                        {formattedData.length > 0 && (
                            <CandlestickChartProvider data={formattedData}>
                                <CandlestickChart height={154} width={330}>
                                    <CandlestickChart.Candles />
                                    <CandlestickChart.PriceText/>
                                </CandlestickChart>
                            </CandlestickChartProvider>
                        )}

                    </View>
                    <View style={{ position: "absolute", right: 0, top:20 }} className={"gap-8"}>
                        {priceLevels.map((p, i) => (
                            <Text key={i} style={{ color: "white", fontSize: 12 }} className={"text-right"}>
                                {count===1?p:(count===4?(Number(p)*inr).toFixed(1):p)}
                            </Text>
                        ))}
                    </View>
                    <View className={"w-[380px] flex flex-row pt-[40px] gap-[18px]"}>
                        {formattedTimeLevels.map((p, i) => (
                            <Text key={i} className={"text-white text-xs"}>
                                {p}

                            </Text>
                        ))}


                    </View>
                    <View className={"flex flex-row justify-between pt-[8px] "}>
                        {timeinterval.map((p, i) => (


                                <View key={i} className={""}>

                                    <TouchableOpacity  className={"  border-r-[#ffffff59] border-r-[0.4px] items-center justify-center h-[34px] rounded-[3px]"} style={{width:w,backgroundColor:p===selectedInterval?"#7777773B":""}} onPress={()=>handleIntervalPress(p)}>
                                        <Text className={" bold text-xs font-bold"} style={{color:p===selectedInterval?"white":"#777777"}}>{p==="D"?"1":""}{p}{p!="D"?"m":""}</Text>
                                    </TouchableOpacity>
                                </View>

                        ))}
                    </View>



                </View>
            </View>
            <View className={"w-full h-[48px] flex flex-row"}>
                <TouchableOpacity>
                    <View className={"h-full bg-[#5ED5A8] justify-center items-center"} style={{width:width/2}}>
                        <Text>BUY</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                <View className={"h-full bg-[#DD4B4B] justify-center items-center"} style={{width:width/2}}>
                    <Text>SELL</Text>

                </View>
            </TouchableOpacity>

            </View>
            <View className={" p-2.5 bg-[#1B232A] absolute left-[130px] top-[200px] gap-3 rounded-xl border-[0.6px] border-white"} style={{display:display}}>
                <TouchableOpacity className={"border-b border-b-white"} onPress={() => {
                    setCoin("SOL")
                    setDisplay("none")

                }}>
                    <Text className={"text-white font-bold text-xs text-center"}>SOL/{count===1?"USDT":(count===4?"INR":"USDT")}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"border-b-white border-b"} onPress={() => {
                    setCoin("BTC")
                    setDisplay("none")
                }}>
                    <Text className={"text-white font-bold text-xs text-center"}>BTC/{count===1?"USDT":(count===4?"INR":"USDT")}</Text>
                </TouchableOpacity>
            </View>
            <View className={"flex flex-row justify-between w-full h-[48px] border-b-[0.2px] border-b-[#1B232A33]"}>
                <TouchableOpacity className={"items-center justify-center"} style={{width:width/3}}>
                    <Text>Open Order</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"items-center justify-center bg-[#F1F4F6]"} style={{width:width/3}}>
                    <Text>Order Book</Text>
                </TouchableOpacity>
                <TouchableOpacity className={"items-center justify-center"} style={{width:width/3}}>
                    <Text>Market Trade</Text>
                </TouchableOpacity>

            </View>
            <View className={"flex flex-row h-[200px] justify-between"}>
                <View className={"h-full border-r-[0.2px] border-r-[#1B232A33]"} style={{width:width/2}}>
                    <View className={"w-full h-[32px] border-b-[0.2px] border-b-[#1B232A33]  justify-center"}>
                        <Text className={"text-[#A7AFB7]"}>Bid</Text>
                    </View>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{height:20}}
                    >
                        <View className={"px-[10px] gap-[2.5px]"}>
                            {bids.map((bid, i) => (
                                <View key={i} className={"w-full flex flex-row justify-between "}>
                                    <Text className={"text-[12px] text-left text-[#1B232A]"}>{count===1?bid[0]:(count===4?(bid[0]*inr).toFixed(2):[bid[0]])}</Text>
                                    <Text className={"text-[12px] text-right text-[#5ED5A8] bg-[#5ED5A81A]"}>{count===1?bid[1]:(count===4?(bid[1]*inr).toFixed(2):[bid[1]])}</Text>

                                </View>
                            ))}

                        </View>
                    </ScrollView>


                </View>
                <View className={"h-full "} style={{width:width/2}}>
                    <View className={"w-full h-[32px] border-b-[0.2px] border-b-[#1B232A33]  justify-center"}>
                        <Text className={"text-[#A7AFB7]"}>Ask</Text>
                    </View>
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    >
                        <View className={"px-[10px] gap-[2.5px]"}>
                            {ask.map((bid, i) => (
                                <View key={i} className={"w-full flex flex-row justify-between "}>
                                    <Text className={"text-[12px] text-left text-[#1B232A]"}>{count===1?bid[0]:(count===4?(bid[0]*inr).toFixed(2):[bid[0]])}</Text>
                                    <Text className={"text-[12px] text-right text-[#DD4B4B] bg-[#DD4B4B1A] "}>{count===1?bid[1]:(count===4?(bid[1]*inr).toFixed(2):[bid[1]])}</Text>

                                </View>
                            ))}

                        </View>
                    </ScrollView>


                </View>

            </View>


        </View>
    )
}
export default Trades

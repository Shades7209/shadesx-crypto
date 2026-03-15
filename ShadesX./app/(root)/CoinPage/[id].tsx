import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    LayoutChangeEvent, Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { router, useLocalSearchParams } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import {useAuth} from "@/Context/AuthContext";
import Modal from 'react-native-modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import CoinModal from "@/components/CoinModal";
import touchableWithoutFeedback from "react-native-gesture-handler/src/components/touchables/TouchableWithoutFeedback";


/* ---------- TYPES ---------- */



type ChartPoint = {
    time: string;
    price: number;
};




export default function Id() {
    const { id,image,name,symbol } = useLocalSearchParams<{ id: string,image:string,name:string,symbol:string,price:string }>();
    const {user} = useAuth()
    const[isvisible,setIsvisible] = useState<boolean>(false)
    const [coin, setCoin] = useState<any | null>(null);
    const [graphData, setGraphData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [selectedInterval, setSelectedInterval] = useState<string>("1");
    const [error, setError] = useState<string | null>(null);
    const[inr,setInr] = useState<any|null>(0);
    const sy = symbol.toUpperCase()
    const[balance, setBalance] = useState<any>(0);
    const [bal, setbal] = useState(0);





    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_BYBIT_API_URL}/tickers?category=spot&symbol=${sy}USDT`);
            const json = await res.json();
            setCoin(json);

            if(json.retCode===10001) {
                Alert.alert("This Coin Coming Soon")
                router.back()
            }




            const r = await axios.post<ChartPoint[]>(
                `${process.env.EXPO_PUBLIC_API_URL}/market/getchart`,
                { coin: sy, days: selectedInterval }
            );


            setGraphData(r.data);

            const inrw = await fetch(`${process.env.EXPO_PUBLIC_FRANKFURTER_API_URL}?base=USD`);
            const json4 = await inrw.json();
            setInr(json4?.rates?.INR);
            const t = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/wallet/cbfetch`, {
                id:user,
                symbol: sy,
            })

            setBalance(t.data)
            console.log(t.data.code);

            const res1 = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/wallet/currentBalancefetch`,{
                id:user
            })
            setbal(res1.data.user.balance);




        } catch (e) {
            console.log("API error:", e);
            setError("Failed to load chart data");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [id,selectedInterval]);












    const lastPoints = graphData.slice(-25);

    const cleanPoints = lastPoints.filter(
        (p) => Number.isFinite(Number(p?.price))
    );

    let prices: number[] = cleanPoints.map((p) => Number(p.price));

    if (prices.length > 1) {
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        if (max === min) prices = prices.map((v, i) => v + i * 0.0001);
    }


    const maxLabels = Math.max(Math.floor(chartWidth / 60), 2);
    const step = Math.ceil(cleanPoints.length / maxLabels);

    const labels = cleanPoints.map((item, i) =>
        i % step === 0
            ? new Date(item.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
            : " "
    );

    const chartData = {
        labels,
        datasets: [{ data: prices }],
    };

    const isUp =
        prices.length > 1 ? prices[prices.length - 1] > prices[0] : true;

    const graphColor = isUp ? "#16c784" : "#ea3943";

    const formatNumber = (num: string | number): string => {
        const n = Number(num)*inr;
        if (!Number.isFinite(n)) return "";
        if (n >= 10000000) return (n / 10000000).toFixed(2) + "Cr";
        if (n >= 100000) return (n / 100000).toFixed(2) + "L";
        if (n >= 1000) return (n / 1000).toFixed(1) + "K";
        return Math.round(n).toString();
    };

    const onLayout = (e: LayoutChangeEvent) => {
        setChartWidth(e.nativeEvent.layout.width);
    };

    if (loading || !coin) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-[#161C22]">
                <ActivityIndicator size="large" color="white" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-[#161C22]">
                <ActivityIndicator size="large" color="white" />
                <Text className={"text-red-700"}>Server error pls try again</Text>
            </SafeAreaView>
        );
    }

    let change24per1 = 0
    let change241 =0
    let coinprice = 0

    try{
        const change24 = (coin.result.list[0].lastPrice-coin.result.list[0].prevPrice24h)*inr
        const change24per = Number((coin.result.list[0].price24hPcnt))
        const coinprice1 = coin.result.list[0].lastPrice
        change24per1=change24per
        change241 = change24
        coinprice = coinprice1
    }catch (error) {
        console.error(error);
        router.back()
    }



    const timeinterval = ["1","5","15","30","60","D"]

    const handleIntervalPress = (p: string) => {
        setSelectedInterval(p);

    };

    const visibleLabels = labels.filter(l => l.trim() !== "");



    return (
        <SafeAreaView className="flex-1 bg-[#161C22] px-3">


            <View className="flex-row items-center justify-between">
               <View className={"flex-row items-center gap-3"}>
                   <TouchableOpacity onPress={() => router.replace("/Market")}>
                       <Entypo name="chevron-left" size={30} color="white" />
                   </TouchableOpacity>

                   <Image
                       source={{ uri: image }}
                       className="w-11 h-11 rounded-full"
                   />

                   <Text className="text-white font-bold">
                       {name} ({symbol.toUpperCase()})
                   </Text>
               </View>
                <View className={""}>
                    <TouchableOpacity onPress={() => router.push("/Deposit")}>
                        <View className={"size-max rounded-full items-center justify-center"}>
                            <Ionicons name="wallet" size={24} color="white" />
                            <Text className={"text-xs  text-white font-bold"}>₹{bal.toLocaleString()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>


            <View className={"flex flex-row gap-[7px] items-center pt-[20px]"}>
                <Text className={"text-[24px] text-white font-bold"}>₹{(coin.result.list[0].lastPrice*inr).toLocaleString()}</Text>
                <Text style={{color:change241<0?"red":"green"}} className={"text-[16px] text-center font-bold"}>{change241<0?"":"+"}{change241?.toLocaleString()}</Text>
                <Text className={"right-2 text-xs font-bold"} style={{color:change24per1<0?"red":"green"}}>({change24per1<0?"":"+"}{change24per1.toFixed(3)}%)</Text>
            </View>


            <View className="mt-5" onLayout={onLayout}>
                {prices.length > 1 && chartWidth > 0 && (
                    <LineChart

                        data={chartData}
                        width={chartWidth}
                        height={260}

                        bezier
                        withDots
                        withVerticalLines={false}
                        xLabelsOffset={10}
                        withOuterLines={false}
                        withVerticalLabels={false}
                        formatYLabel={(v) => formatNumber(v)}
                        chartConfig={{
                            backgroundGradientFrom: graphColor,
                            backgroundGradientTo: "#161C22",
                            color: () => graphColor,
                            labelColor: () => "white",
                            fillShadowGradient: graphColor,
                            fillShadowGradientOpacity: 0.15,
                            propsForBackgroundLines: {
                                stroke: "rgba(255,255,255,0.08)",
                            },

                        }}
                        style={{ borderRadius: 18 }}
                    />
                )}
            </View>
            <View className={"flex flex-row justify-between pt-[15px]"}>
                {timeinterval.map((item, i) => (
                    <View key={i}>
                        <TouchableOpacity className={"h-[30px] w-[35px] bg-red-600 items-center justify-center rounded-xl"  } style={{backgroundColor:item===selectedInterval?"#7777773B":""}} onPress={()=>handleIntervalPress(item)}>
                            <Text className={"bold"} style={{color:item===selectedInterval?"white":"#777777"}}>{item==="D"?"1":item}{item==="D"?"D":"m"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View className={"pt-[20px]"} style={{
                shadowColor: 'white',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
            }}>
                <View className={"h-[72px] bg-[#161C22] rounded-[16px] px-[16px]"} style={{width:chartWidth-3,}}>
                    <View className={"flex flex-row justify-between w-full h-full"}>
                        <View className={"flex flex-row gap-[10px] items-center"}>
                            <Image
                            source={{ uri: image }}
                            style={{width:40,height:40,}}
                            />
                            <View>
                                <Text className={"text-white font-bold"}>{name}</Text>
                                <Text className={"text-[#777777] text-xs font-semibold "}>{balance.balance.toFixed(8)} {symbol.toUpperCase()}</Text>
                            </View>
                        </View>
                        <View className={"justify-center h-full"}>
                            <Text className={"text-white font-bold text-right"}>₹{((((coin.result.list[0].lastPrice)*balance.balance)*inr).toLocaleString())}</Text>
                            <Text className={"text-right text-xs text-[#777777] font-semibold"}>000%</Text>
                        </View>

                    </View>

                </View>
            </View>

            <View className={"pt-[20px] flex flex-row justify-between gap-[10px]"} style={{width:chartWidth}}>
                <TouchableOpacity className={" h-[50px] bg-green-500 items-center justify-center rounded-[16px]"} style={{width:chartWidth/2-10}} onPress={()=>{
                    if(balance.code===404){
                        Alert.alert("This Coin Purchase Coming Soon")
                        return;
                    }
                    setIsvisible(true)
                }}>
                    <Text className={"text-white font-bold text-[16px]"}>BUY</Text>

                </TouchableOpacity>
                <TouchableOpacity className={" h-[50px] bg-red-600 items-center justify-center rounded-[16px]"} style={{width:chartWidth/2-10}}>
                    <Text className={"text-white font-bold text-[16px]"}>SELL</Text>

                </TouchableOpacity>
            </View>

            <View className={"flex flex-row gap-[10px] absolute top-[390px] left-[50px]"} style={{width:chartWidth-3}}>
                {visibleLabels.map((item, i) => (
                    <View key={i} className={""}>
                        <Text className={"text-white text-[13px]"}>{item}</Text>
                    </View>
                ))}
            </View>
            
            <Modal
            isVisible={isvisible}
            style={{justifyContent:"flex-end", margin:0}}
            swipeDirection={"down"}
            onSwipeComplete={()=>setIsvisible(false)}
            onBackdropPress={()=>setIsvisible(false)}
            avoidKeyboard={true}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            backdropOpacity={0.2}


            >

                <CoinModal bal={bal} priceINR={inr} coinprice={coinprice} sy={symbol} logo={image}/>

            </Modal>

        </SafeAreaView>
    );
}

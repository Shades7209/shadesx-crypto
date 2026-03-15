import {
    ActivityIndicator,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import Menu from "@/app/(root)/menu";
import Coin_Card from "@/components/Coin_Card";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import '@shopify/react-native-skia';
import 'expo-router/entry';




import {StatusBar} from "expo-status-bar";
import {Redirect, router} from "expo-router";
import {useAuth} from "@/Context/AuthContext";
const API_URL = `${process.env.EXPO_PUBLIC_COINGECKO_API_URL}/coins/markets?vs_currency=inr&days=7&x_cg_demo_api_key=${process.env.EXPO_PUBLIC_COINGECKO_API_KEY}`;

export default function Index() {
    const {user,loading,logout} = useAuth();


    const [data, setData] = useState<any[]>([]);
    const [coins, setCoins] = useState<any[]>([]);






    const [loading1, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCoins = async (showSpinner = false) => {
        try {
            if (showSpinner) setIsRefreshing(true);

            const res = await fetch(API_URL);
            const json = await res.json();
            setCoins(Array.isArray(json) ? json : []);
        } catch (e) {
            console.log(e);
        } finally {
            if (showSpinner) setIsRefreshing(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoins();

        const interval = setInterval(() => {
            fetchCoins(false);
        }, 20000);

        return () => clearInterval(interval);
    }, []);





    if (loading1) {
        return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
    }


    const recentCoins = coins.filter((_, index) => index >= 11 && index < 20);
    const topcoin = coins.filter((_, index) => index >= 0 && index < 10);
    const topL = [...coins].sort(
        (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
    ).slice(0, 10);
    const topG = [...coins].sort(
        (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
    ).slice(0, 10);






    return (

            <FlatList
                data={[]}
                refreshing={isRefreshing}
                onRefresh={() => fetchCoins(true)}




                renderItem={null}
                ListHeaderComponent={
                    <View className={"size-full bg-[#161C22] "}>
                        <StatusBar style={"light"} animated={true}/>
                        <View className={"w-full h-[220px]"}>


                            <View className={"w-full h-[95px] justify-between px-[24px] pt-[70px] flex flex-row items-center"}>
                                <TouchableOpacity onPress={()=>router.push("/Profile")}>
                                    <View className="w-[36px] h-[36px] bg-white rounded-full"/>
                                </TouchableOpacity>
                                <View className="flex-row gap-[20px]">
                                    <TouchableOpacity>
                                        <MaterialIcons name="qr-code-scanner" size={28} color="#5ED5A8" />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View className={"size-full top-8"}>
                                <Menu/>

                            </View>

                        </View>
                        <View className={"size-full bg-white"}>

                            <TouchableOpacity>
                                <View className="px-[24px] pt-[25px]">
                                    <View className="w-full h-[77px] bg-[#E3E8ED80] rounded-[16px] p-[12px] flex-row justify-between">
                                        <View className="flex-row">
                                            <LinearGradient
                                                colors={["#1B232A", "#5ED5A8"]}
                                                style={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: 12,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/Menu_Image/P2P Crypto Icon.png")}
                                                    style={{ width: 32, height: 32 }}
                                                />
                                            </LinearGradient>

                                            <View className="ml-[16px] mt-[6px]">
                                                <Text className="text-[16px] font-semibold">
                                                    P2P Trading
                                                </Text>
                                                <Text className="text-xs text-[#A7AFB7]">
                                                    Bank Transfer, Paypal
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="w-[40px] h-[40px] bg-[#E3E8ED] rounded-[16px] items-center justify-center top-2">
                                            <Entypo name="chevron-right" size={24} color="#777" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View className="px-[24px] pt-[7px]">
                                    <View className="w-full h-[77px] bg-[#E3E8ED80] rounded-[16px] p-[12px] flex-row justify-between">
                                        <View className="flex-row">
                                            <LinearGradient
                                                colors={["#1B232A", "#5ED5A8"]}
                                                style={{
                                                    width: 52,
                                                    height: 52,
                                                    borderRadius: 12,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image
                                                    source={require("../../../assets/Menu_Image/Credit Card Icon.png")}
                                                    style={{ width: 32, height: 32 }}
                                                />
                                            </LinearGradient>

                                            <View className="ml-[16px] mt-[6px]">
                                                <Text className="text-[16px] font-semibold">
                                                    Credit/Debit Card
                                                </Text>
                                                <Text className="text-xs text-[#A7AFB7]">
                                                    Visa, Mastercard, ...
                                                </Text>
                                            </View>
                                        </View>

                                        <View className="w-[40px] h-[40px] bg-[#E3E8ED] rounded-[16px] items-center justify-center top-2">
                                            <Entypo name="chevron-right" size={24} color="#777" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View className="pt-[28px]">
                                <Text className="text-[18px] font-bold mb-[12px] px-[24px] ">
                                    Recent Coin
                                </Text>

                                <View className={"h-[135px] items-center justify-center"}>
                                    <FlatList
                                        data={recentCoins}
                                        horizontal
                                        keyExtractor={(item) => item.id}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Coin_Card
                                                image={item.image}
                                                coinP={item.current_price}
                                                name={item.symbol}
                                                change={item.price_change_percentage_24h}
                                                id={item?.id}
                                                symbol={item?.symbol}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="pt-[20px]">
                                <Text className="text-[18px] font-bold mb-[12px] px-[24px] ">
                                    Top Coin
                                </Text>

                                <View className={"h-[135px] items-center justify-center"}>
                                    <FlatList
                                        data={topcoin}
                                        horizontal
                                        keyExtractor={(item) => item.id}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Coin_Card
                                                image={item.image}
                                                coinP={item.current_price}
                                                name={item.symbol}
                                                change={item.price_change_percentage_24h}
                                                id={item?.id}
                                                symbol={item?.symbol}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="pt-[20px]">
                                <Text className="text-[18px] font-bold mb-[12px] px-[24px] ">
                                    Top Gainer
                                </Text>

                                <View className={"h-[135px] items-center justify-center"}>
                                    <FlatList
                                        data={topG}
                                        horizontal
                                        keyExtractor={(item) => item.id}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Coin_Card
                                                image={item.image}
                                                coinP={item.current_price}
                                                name={item.symbol}
                                                change={item.price_change_percentage_24h}
                                                id={item?.id}
                                                symbol={item?.symbol}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="pt-[20px]">
                                <Text className="text-[18px] font-bold mb-[12px] px-[24px] ">
                                    Top Loser
                                </Text>

                                <View className={"h-[135px] items-center justify-center"}>
                                    <FlatList
                                        data={topL}
                                        horizontal
                                        keyExtractor={(item) => item.id}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Coin_Card
                                                image={item.image}
                                                coinP={item.current_price}
                                                name={item.symbol}
                                                change={item.price_change_percentage_24h}
                                                id={item?.id}
                                                symbol={item?.symbol}
                                            />
                                        )}
                                    />
                                </View>
                            </View>





                        </View>



                    </View>


                }
                showsVerticalScrollIndicator={false}
            />


    );
}

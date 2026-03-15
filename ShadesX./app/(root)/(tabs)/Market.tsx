import {
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import CoinBar from "@/components/Coin_Bar";
import BottomSheet from "@gorhom/bottom-sheet";

const API_URL = `${process.env.EXPO_PUBLIC_COINGECKO_API_URL}/coins/markets?vs_currency=inr&days=7&x_cg_demo_api_key=${process.env.EXPO_PUBLIC_COINGECKO_API_KEY}`;

const Market = () => {



    const [coins, setCoins] = useState<any[]>([]);
    const [query, setQuery] = useState("");


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
        }
    };


    useEffect(() => {
        fetchCoins();

        const interval = setInterval(() => {
            fetchCoins(false);
        }, 2000);

        return () => clearInterval(interval);
    }, []);


    const filteredCoins = useMemo(() => {
        if (!query.trim()) return coins;

        const q = query.toLowerCase();

        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(q) ||
                coin.symbol.toLowerCase().includes(q)
        );
    }, [coins, query]);

    return (
        <SafeAreaView className="flex-1 bg-[#1B232A] px-[24px]">
            {/* HEADER */}
            <View className="h-[65px] flex-row justify-between items-center">
                <View className="w-[36px] h-[36px] bg-white rounded-full" />
                <View className="flex-row gap-[20px]">

                    <MaterialIcons
                        name="qr-code-scanner"
                        size={28}
                        color="#5ED5A8"
                    />

                </View>
            </View>

            {/* SEARCH BAR */}
            <View className="w-full h-[46px] bg-[#161C22] rounded-[12px] flex-row items-center px-[20px] gap-[10px]">
                <Feather name="search" size={20} color="#5ED5A8" />
                <TextInput
                    style={{ flex: 1, color: "white" }}
                    placeholder="Search your coin"
                    placeholderTextColor="#9CA3AF"
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                />
            </View>

            {/* COIN LIST */}
            <View className="flex-1 pt-[20px]">
                <FlatList
                    data={filteredCoins}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    refreshing={isRefreshing}
                    onRefresh={() => fetchCoins(true)} // 👈 user pull
                    renderItem={({ item }) => (
                        <CoinBar
                            image={item.image}
                            name={item.name}
                            symbol={item.symbol}
                            coinP={item.current_price}
                            change={item.price_change_percentage_24h}
                            id={item.id}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default Market;

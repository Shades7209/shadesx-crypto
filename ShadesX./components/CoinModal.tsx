import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, {useEffect, useState} from 'react'
import Slider from "@react-native-community/slider";
import axios from 'axios'
import {useAuth} from "@/Context/AuthContext";
import {router} from "expo-router";

const CoinModal = ({bal,priceINR,coinprice,sy,logo}:{bal:number,priceINR:number,coinprice:number,sy:string,logo:string}) => {
    const [amount, setAmount] = useState(0);
    const [amountText, setAmountText] = useState("0");
    const [mode, setMode] = useState<"amount" | "qty">("amount");
    const[slidervalue,setSlidervalue] = useState<number>(0);
    const [qtyText, setQtyText] = useState("0");
    const [coinbalance, setCoinbalance] = useState(0);

    const{user} = useAuth();






    const onAmountChange = (val:string)=>{
        setMode("amount");

        const raw = val.replace(/,/g,"");
        if(raw === ""){
            setAmount(0);
            setAmountText("");
            return;
        }

        if(!/^\d*$/.test(raw)) return;

        const num = Number(raw);
        setAmount(num);
        setAmountText(formatINR(num));
    };
    const formatINR = (num:number)=>{
        if(!isFinite(num)) return "0";
        return num.toLocaleString("en-IN");
    };
    const onSliderChange = (percent:number)=>{
        setMode("amount");

        const newAmount = (bal * percent) / 100;

        setAmount(newAmount);
        setAmountText(formatINR(newAmount));
        setSlidervalue(percent)
    };
    const onQtyChange = (val:string)=>{
        setMode("qty");

        if(val === ""){
            setCoinbalance(0);
            setQtyText("");
            return;
        }

        if(!/^\d*\.?\d*$/.test(val)) return;

        const num = Number(val);
        setCoinbalance(num);
        setQtyText(val);
    };
    const formatQty = (num:number)=>{
        if(!isFinite(num)) return "0";
        return parseFloat(num.toFixed(8)).toString();
    };

    useEffect(()=>{
        if(mode !== "amount") return;
        if(!priceINR) return;
        if(amount<0) return;


        const qty = amount / (coinprice*priceINR);
        setCoinbalance(qty);
        setQtyText(formatQty(qty));

    },[amount, priceINR, mode]);


// quantity → amount
    useEffect(()=>{
        if(mode !== "qty") return;
        if(!priceINR) return;
        if(coinbalance<0) return

        const amt = coinbalance * (coinprice*priceINR);
        setAmount(amt);
        setAmountText(formatINR(amt));

    },[coinbalance, priceINR, mode]);


    const handlepress = async () => {
        if (
            amount <= 0 ||
            coinbalance <= 0 ||
            amount > bal ||
            !isFinite(amount) ||
            !isFinite(coinbalance)
        ) {
            Alert.alert("Invalid purchase amount");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/wallet/putcoinbalance`,
                {
                    id: user,
                    balance: coinbalance,
                    symbol: sy,
                    amount: amount,
                }
            );

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/transaction/transaction`,
                {
                    id: user,
                    type: "C",
                    status: "success",
                    amount: coinbalance,
                    price: amount,
                    currency: "INR",
                    product: sy,
                    logo: logo,
                }
            );

            Alert.alert("Successfully purchased.");
            router.back();
        } catch (e: any) {
            console.log(e.message);
        }
    };

    const per = ["25","50","75","100"]
    return (
        <View>
            <View className={" h-[400px] px-[12px] bg-[#1B232A] rounded-t-[40px]"}>
                <View className={"pt-[15px]"}>
                    <View className={"w-full h-[30px] justify-center border-b-[0.2px] border-b-white"}>
                        <View className={"ml-auto flex flex-row gap-[10px] items-center "}>
                            <Text className={"text-[#777777] text-xs"}>AVAILABLE:</Text>
                            <Text className={"text-white font-bold"}>₹{bal.toLocaleString()}</Text>
                            <Text className={"text-[#777777] text-xs"}>INR</Text>
                        </View>

                    </View>
                </View>
                <View className={"pt-[10px]"} style={{
                    shadowColor: 'white',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                }}>
                    <View className={"h-[150px] bg-[#161C22] rounded-[16px]  flex flex-col px-1 border"} style={{borderColor:amount>=0?(amount<=bal?"green":"red"):"red"}}>
                        <View className={"flex flex-row justify-between w-full items-center pl-2 pb-[10px] pt-[7px] "}>
                            <Text className={"text-white"}>Price:-</Text>
                            <View className={"items-center flex flex-row gap-[2px]"}>
                                <Text className={"text-white"}>₹</Text>
                                <TextInput
                                    value={amountText}
                                    keyboardType="numeric"
                                    onChangeText={onAmountChange}
                                    style={{color:"white"}}
                                />

                            </View>
                            <View className={"items-center flex flex-row right-1 gap-[10px]"}>
                                <TouchableOpacity className={"items-center "} onPress={()=>{
                                    setMode("amount");
                                    setAmount(prev=>{
                                        const v = prev + 1000;
                                        setAmountText(formatINR(v));
                                        return v;
                                    });
                                }}
                                >
                                    <Text className={"text-white text-[25px]"}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={"w-[30px] h-[45px] justify-center bg-[#1B232A] rounded-[12.5px] rounded-l-none "} onPress={()=>{
                                    setMode("amount");
                                    setAmount(prev=>{
                                        const v = Math.max(0, prev - 1000);
                                        setAmountText(formatINR(v));
                                        return v;
                                    });
                                }}
                                >
                                    <View className={"items-center"}>
                                        <Text className={"text-white text-[25px]"}>-</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className={"px-[20px]"}>
                            <View className={"border-t-[0.2px] border-t-[#fcfbf71A]"}></View>
                        </View>
                        <View className={"pt-[10px] w-full items-center px-[20px]"}>
                            <Slider

                                style={{width: "100%", height: 40}}
                                value={(amount/bal) * 100}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#16C784"
                                maximumTrackTintColor="#2B3139"
                                onValueChange={(v)=>{
                                    onSliderChange(v)
                                }}



                            />
                            <View className={"flex flex-row justify-between w-full bottom-3"}>

                                {per.map((p, i) => (
                                    <TouchableOpacity className={"size-[40px] items-center justify-center"} key={i} onPress={() => onSliderChange(p)} style={{backgroundColor:String(slidervalue)===p?"#1B232A":"",borderRadius:"100%"}}>
                                        <Text className={"text-xs font-bold"} style={{color:String(slidervalue)===p?"white":"#777777"}}>{p}%</Text>
                                    </TouchableOpacity>
                                ))}

                            </View>
                        </View>

                    </View>

                </View>
                <View className={"pt-[20px]"} style={{
                    shadowColor: 'white',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                }}>
                    <View className={"h-[54px] bg-[#161C22] rounded-[16px] px-[12px] border"} style={{borderColor:coinbalance<0?"red":(bal / (coinprice*priceINR)>=coinbalance?"green":"red")}}>
                        <View className={"flex flex-row justify-between items-center pt-[5px]"}>
                            <Text className={"text-white"}>Quantity:-</Text>
                            <View className={"items-center flex flex-row gap-[2px]"}>

                                <TextInput
                                    value={qtyText}
                                    keyboardType="decimal-pad"
                                    onChangeText={onQtyChange}
                                    style={{color:"white"}}
                                />

                            </View>
                            <View className={"items-center flex flex-row right-1 gap-[10px] "}>
                                <TouchableOpacity className={"items-center w-[30px] h-[45px] justify-center  rounded-[12.5px] bg-[#1B232A] rounded-r-none "} onPress={()=>{
                                    setMode("qty");
                                    setCoinbalance(prev=>{

                                        const v = prev + 0.5;
                                        setQtyText(formatQty(v));
                                        return v;
                                    });
                                }}
                                >
                                    <Text className={"text-white text-[25px]"}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={""} onPress={()=>{
                                    setMode("qty");

                                    setCoinbalance(prev=>{
                                        const v = Math.max(0, prev - 0.5);
                                        setQtyText(formatQty(v));
                                        return v;
                                    });
                                }}
                                >
                                    <View className={"items-center"}>
                                        <Text className={"text-white text-[25px]"}>-</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>
                <View className={"pt-[20px]"}>
                    <TouchableOpacity onPress={handlepress}>
                        <View className={" h-[60px] bg-green-500 rounded-[30px] items-center justify-center"}>
                            <Text className={"font-bold text-white text-[20px]"}>BUY</Text>

                        </View>
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    )
}
export default CoinModal

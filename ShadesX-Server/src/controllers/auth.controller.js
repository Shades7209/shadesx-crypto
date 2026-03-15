const UserModel = require("../model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const tempUserModel = require("../model");
const { Resend } = require("resend");

const createWALLET = async (userId) => {
    const coin = await UserModel.CoinModel.find();

    const wallets = coin.map(coin => ({
        user: userId,
        coin: coin._id,
        balance: 0,
    }));

    await UserModel.WalletModel.insertMany(wallets)
}

const registerUser = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp)
        return res.status(400).send({ message: "Enter OTP" });

    const user = await tempUserModel.tempUserModel.findOne({ email });

    if (!user)
        return res.status(400).send({ message: "Request OTP first" });


    if (user.expire < Date.now()) {
        await tempUserModel.tempUserModel.deleteOne({ email });
        return res.status(400).send({ message: "OTP expired please register again" });
    }


    if (otp !== user.otp)
        return res.status(400).send({ message: "Invalid OTP" });


    const user1 = await UserModel.UserModel.create({
        email,
        password: user.password
    });

    await tempUserModel.tempUserModel.deleteOne({ email });

    createWALLET(user1._id)



    return res.status(201).send({ 
        message: "Registration Successfully Please login",
    });
};

const EmailVerify = async (email, otp,expire) => {
    const resend = new Resend("re_h89tKH7k_APo4sWdoHZP2L5vy6ah2CEYe")
    console.log(otp,email)

    await resend.emails.send({
        from: "ShadeX <onboarding@resend.dev>",
        to: email,
        subject: "Verify your email",
        html: `<p>Verify your email address on SHADEX OTP: <b>${otp} expire in ${expire}</b></p>`
    })
    return true;
}

const registerEmail = async (req, res) => {
    const { email,password } = req.body;

    const genrateOTP = () => {
        return crypto.randomInt(100000, 999999).toString();
    }

    const otp = genrateOTP();
    const expire = new Date(Date.now() + 5 * 60 * 1000);

    try{
        if(!email || !password){
            return res.status(400).send({
                message:"please enter email and password",
            })
        }
        const exUser = await tempUserModel.tempUserModel.findOne({email})
        const alreadyUser = await UserModel.UserModel.findOne({email})
        if(alreadyUser){
            return res.status(400).send({
                message:"Email already exists",
            })
        }
        if(exUser){
            const newuser= await tempUserModel.tempUserModel.findOneAndUpdate(
                    { email },
                    { otp: otp, expire ,password: password },
                    { new: true ,runValidators:true}
                );

                await EmailVerify(email, otp,expire);

                return res.status(200).send({
                    message: "OTP resent successfully",
                    newuser,
                });
            }

        const user = await tempUserModel.tempUserModel.create({
            email,
            password,
            otp,
            expire
        })
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.cookie("token",token)
        await EmailVerify(email, otp,expire);

        res.status(200).send({
            message:"Success",
            user,
            token

        })
    }catch (error){
        if (error.name === "ValidationError") {
            const firstError = Object.values(error.errors)[0].message;
            return res.status(400).send({ message: firstError });
        }


        if (error.name === "MongooseError") {
            return res.status(400).send({ message: "Email already registered" });
        }


        res.status(500).send({ message: "Server error" });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).send({ message: "Email and password is required" });
        }


        const findUser = await UserModel.UserModel.findOne({ email });

        if (!findUser) {
            return res.status(400).send({ message: "User not found, Please Register" });
        }


        if (password !== findUser.password) {
            return res.status(401).send({ message: "Invalid Password" });
        }


        const token = jwt.sign(
            { id: findUser._id },
            process.env.JWT_SECRET
        );

        res.cookie("token", token);
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        return res.status(200).send({
            user: findUser,
            token

        });

    } catch (err) {
        res.status(500).send({ message: "Server error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    registerEmail,
};
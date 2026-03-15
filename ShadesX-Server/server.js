const app = require("./src/app")
const connectDb = require("./src/DataBase/DB");


connectDb()






app.listen(3000,()=>{
    console.log("Server started on port 3000")
})
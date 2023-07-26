
const express = require("express")
const userRouter = require("./router/user")
const ENV = require("../config")
const app = express()
app.use(express.json())
app.use(userRouter)
app.listen(ENV.PORT, () => {
    console.log(`Server listening on port: ${ENV.PORT}`);
});

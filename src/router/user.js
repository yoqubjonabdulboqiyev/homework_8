const { createUser, loginUser, givePrice } = require("../controller/user")

const router = require("express").Router()

router.post("/user", createUser)
router.post("/user/login", loginUser)
router.post("/user/give", givePrice)



module.exports = router;
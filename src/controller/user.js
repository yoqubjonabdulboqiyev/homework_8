
const Oi = require("../utils/oi.js")
const Users = new Oi(process.cwd() + "/src/database/user.json")
const bcrypt = require("bcrypt")
const { get } = require("../utils/get.js")
const User = require("../model/user.js")
const { v4: uuid } = require("uuid")


const createUser = async (req, res) => {
    const { fullName, phoneNumber, password } = req.body;

    if (!fullName || !phoneNumber || !password) {
        return res.json({ message: "fullName, phoneNumber and password are require" })
    }
    const users = await get(Users)
    let id = (users[users.length - 1]?.id || 0) + 1;
    let newPassword = (await bcrypt.hash(password, 12))
    const user = new User(id, fullName, phoneNumber, newPassword)
    const data = users.length ? [...users, user] : [user]
    await Users.write(data)
    res.json({ message: "create" })
}


const loginUser = async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.json({ message: "id and password are require" })
    }
    const users = await get(Users)
    const findUser = users.find((user) => user.id = id)
    if (!findUser) {
        return res.json({ message: "User not found" })
    }
    if (!(await bcrypt.compare(password, findUser.password))) {
        return res.json({ message: "password invalid" })
    }
    res.json(findUser)
}


const givePrice = async (req, res) => {
    const { id, userId, price } = req.body;
    let users = await get(Users)
    let findId = users.find((user) => user.id == id)
    let findUserId = users.find((user) => user.id == userId)
    if (!findId || !findUserId) {
        return res.json({ message: "userId or id are invalid" })
    }
    if (findId.price < price) {
        return res.json({ message: "You haven't got your price" })
    }
    findId.price -= price;
    findUserId.price += price;
    await Users.write(users)
    res.json({ message: "successfully" })
}


module.exports = {
    createUser,
    loginUser,
    givePrice
}
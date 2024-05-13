const jwt = require('jsonwebtoken');
const User = require('@models/user')
require('dotenv').config();

const signToken = (user) => {
    const token = jwt.sign({
        id: user.id
    }, process.env.SECRET_KEY, {
        expiresIn: 86400
    })
    return token;
}
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ user: undefined, message: " Authorization header not found " })
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: decode.id})
        if (user === null) {
            return res.status(401).json({ user: undefined, message: "Something Went Wrong while fetching User information." })
        } 
        req.user = user;
        next()
    } catch (err) {
        return res.status(401).json({ user: undefined, message: "Invalid Authorization Token" })
    }
}

const findOne = async (model, value) => {
    const data = await model.findOne({ _id: value });
    return data;
}

module.exports = {
    signToken, verifyToken, findOne
}
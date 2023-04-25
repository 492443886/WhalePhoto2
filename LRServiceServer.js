const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./model/user');

const SECRET = "SECRET"


// let register = async (req, res) => {

//     try {

//         const user = new User(req.body);
//         let saveUser = await user.save();
//         res.send(saveUser)
//     } catch (err) {
//         console.log('err' + err);
//         res.status(400).send(err);
//     }
// }

// let login = async (req, res) => {

//     try {

//         const user = req.body;

//         if (!await Authenticate(user))
//             return res.status(403).send({message:"Login fail :( You may typed a wrong password or usernmae."});

//         user.password = ""
//         console.log(user)
//         const accessToken = await generateAccessToken(user)

//         res.json({ accessToken: accessToken })

//     } catch (err) {
//         console.log('err' + err);
//         res.status(500).send(err);
//     }
// }

// function authenticateToken(req, res, next) {

//     try {
//         console.log(req.headers)
//         const token = req.headers['authorization']
//         if (token == null) return res.sendStatus(401)

//         jwt.verify(token, SECRET, (err, user) => {
//             if (err) return res.sendStatus(403)
//             console.log(user)
//             req.auser = user
//             next()
//         })

//     } catch (err) {
//         console.log('err' + err);
//         res.status(500).send(err);
//     }

// }


// async function Authenticate(userInput) {

//     let user = await User.findOne(userInput).exec()

//     console.log(user)

//     if (user == null)
//         return false;
//     else
//         return true;
// }

// async function generateAccessToken(user) {
//     return jwt.sign(user, SECRET, { expiresIn: '2000s' })
// }

let register = async (req, res) => {

    try {

        const user = new User(req.body);
        const n = await User.find({ "username": user.username }).exec()
        if (n.length !== 0) {
            res.status(406).send({ message: "The username already exist!!" });
            return
        }

        let saveUser = await user.save();

        res.send(saveUser)

    } catch (err) {
        console.log('err' + err);
        res.status(400).send(err);
    }
}

let login = async (req, res) => {

    try {

        const user = req.body;

        if (!await Authenticate(user))
            return res.status(403).send({ message: "Login fail :( You may typed a wrong password or usernmae." });

        user.password = ""
        console.log(user)
        const accessToken = await generateAccessToken(user)

        res.json({ accessToken: accessToken })

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

function authenticateToken(req, res, next) {

    try {
        //console.log(req.headers)
        const token = req.headers['authorization']
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            //console.log(user)
            req.auser = user
            next()
        })

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }

}

async function Authenticate(userInput) {

    let user = await User.findOne(userInput).exec()

    //console.log(user)

    if (user == null)
        return false;
    else
        return true;
}

async function generateAccessToken(user) {
    return jwt.sign(user, SECRET, { expiresIn: '2000s' })
}


module.exports = {
    register,
    login,
    authenticateToken,
}
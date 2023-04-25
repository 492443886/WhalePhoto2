const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./model/user');
const Post = require('./model/post');
const Photo = require('./model/photo');
const Profile = require('./model/profile');
const LRS = require('./LRServiceServer')
const mongoose = require('mongoose');

// const SECRET = "SECRET"


// let register = async (req, res) => {

//     try {

//         const user = new User(req.body);
//         const n = await User.find({ "username": user.username }).exec()
//         if (n.length !== 0) {
//             res.status(406).send({ message: "The username already exist!!" });
//             return
//         }

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
//             return res.status(403).send({ message: "Login fail :( You may typed a wrong password or usernmae." });

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
//         //console.log(req.headers)
//         const token = req.headers['authorization']
//         if (token == null) return res.sendStatus(401)

//         jwt.verify(token, SECRET, (err, user) => {
//             if (err) return res.sendStatus(403)
//             //console.log(user)
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

//     //console.log(user)

//     if (user == null)
//         return false;
//     else
//         return true;
// }

// async function generateAccessToken(user) {
//     return jwt.sign(user, SECRET, { expiresIn: '2000s' })
// }



// {
//     photos: [],
//     ?username: 'test',
//     title: 'test',
//     content: 'testc'
// }

let makePost = async (req, res) => {

    try {
        let auser = req.auser
        let p = req.body
        p.username = auser.username
        const post = new Post(p);
        let savePost = await post.save();
        res.send(savePost)
    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

let makePhoto = async (req, res) => {

    try {

        console.log(req.headers)
        let auser = req.auser
        let p = req.body

        //console.log(p)

        p.user = auser.username
        const post = new Photo(p);
        let savePost = await post.save();
        res.send(savePost)
    } catch (err) {
        console.log('err' + err);
        res.status(400).send(err);
    }
}

let deletePhoto = async (req, res) => {

    try {

        console.log('hitted')
        //console.log(req.headers)
        let auser = req.auser
        let id = req.body

        console.log(id)

        //const post = new Photo(p);

        let result = await Photo.deleteOne(id);

        //console.log(result)
        res.send(result)
    } catch (err) {
        console.log('err' + err);
        res.status(400).send(err);
    }
}


let getPhotos = async (req, res) => {

    try {


        let auser = req.auser
        let username = auser.username
        const photos = await Photo.find({ "user": username }).exec()

        res.send(photos)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

let createProfile = async (req, res) => {

    try {

        let body = req.body.user
        // console.log(body)
        // console.log("createProflile")

        let profile = await Profile.findOne({ user: body.user }).exec()
        console.log(profile)
        if (profile === null) {
            profile = new Profile(req.body)
        } else {

            profile.icon = body.icon
            profile.description = body.description
            profile.email = body.email
            profile.location = body.location
            profile.hobby = body.hobby
            profile.food = body.food
            profile.birth_year = body.birth_year
        }

        const profileS = await profile.save()

        res.send(profileS)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }

}
let getProfile = async (req, res) => {

    try {

        let TheUser = req.query.user
        //let body = req.body
        console.log(TheUser)
        const profile = await Profile.findOne({ user: TheUser }).exec()
        res.send(profile)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}




let getPosts = async (req, res) => {

    try {

        const posts = await Post.find().exec()

        res.send(posts)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

// res.body is [...] of post
let getPhotoById = async (req, res) => {

    try {
        let body = req.body

        console.log("getbyid" + body)
        console.log(body)
        // const photos = await Photo.find({ _id: { $in: res.body } }).exec()
        const photos = await Photo.find({ _id: { $in: body } }).exec()
        // console.log(photo[0].user)
        res.send(photos)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}

let commetPost = async (req, res) => {

    try {

        let body = req.body
        console.log(body)
        let id = body._id
        console.log(id)

        // let result = await Post.updateOne({ _id: id }, { $push: { comments: 'rr' } }).exec()


        let p = await Post.findById(id)
        p.comments.push({ user: req.auser.username, comment: body.comment })
        await p.save()

        console.log(p)
        res.sendStatus(202)

    } catch (err) {
        console.log('err' + err);
        res.status(500).send(err);
    }
}



module.exports = {
    makePost,
    makePhoto,
    getPhotos,
    getPosts,
    deletePhoto,
    getPhotoById,
    commetPost,

    createProfile,
    getProfile
}
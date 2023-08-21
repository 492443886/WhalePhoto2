const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('./model/user');
const Service = require('./service');
const LRS = require('./LRServiceServer')

const SECRET = "SECRET"




router.get('/data', (req, res) => {

    res.send("This is data!!")
})


router.post('/register', LRS.register);

router.post('/post', LRS.authenticateToken, Service.makePost)

router.post('/photo', LRS.authenticateToken, Service.makePhoto)

router.post('/commentPost', LRS.authenticateToken, Service.commetPost)


router.delete('/photo', LRS.authenticateToken, Service.deletePhoto)

router.get('/post', LRS.authenticateToken, Service.getPosts)

router.post('/postbyid', LRS.authenticateToken, Service.getPhotoById)

router.get('/photo', LRS.authenticateToken, Service.getPhotos)

router.post('/login', LRS.login)

router.get('/profile', Service.getProfile)

router.post('/profile', Service.createProfile)



module.exports = router
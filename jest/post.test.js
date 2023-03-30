const mongoose = require('mongoose');
const Service = require('../service');
const User = require('../model/user');
const Post = require('../model/post');
const { deleteOne } = require('../model/user');

const dbURI = "mongodb+srv://user0:Mch12345@cluster0.cdojv.mongodb.net/practice1";

test('does it work?',() => {

    expect(1 + 2).toBe(3)
})

jest.setTimeout(50000)

test('does it work2?', async () => {

    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    const user = new User({username: "test", password: "testp"});
    let saveUser = await user.save();
    console.log(saveUser)

    let p = new Post({username:saveUser.username, title: "test", content: "testc", photos: []})
    let sp = await p.save();

    console.log(sp)

    mongoose.disconnect()

})
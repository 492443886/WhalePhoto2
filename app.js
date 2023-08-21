const express = require("express")
const mongoose = require("mongoose")
const myroutes = require("./routes")
const cors = require("cors")

const port = 3070

//const bodyParser = require('body-parser')

const app = express()
app.use(express.json({ limit: "50mb" }))
//app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
//app.use(express.json())
//app.use(express.bodyParser({limit: '50mb'}));
//app.use(bodyParser.json({ limit: '20mb' }));

const dbURI = "mongodb+srv://user0:Mch12345@cluster0.cdojv.mongodb.net/practice1"

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port)
    console.log(port + " port, I am listening ...")
  })
  .catch((err) => console.log(err))

app.use("/api", myroutes)

app.use(express.static(__dirname + "/public/"))

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html")
})

// Additional configuration for setting proper MIME types
// app.use(
//   "/assets",
//   express.static(__dirname + "/public/" + "assets", {
//     setHeaders: (res, filePath) => {
//       if (filePath.endsWith(".js")) {
//         res.setHeader("Content-Type", "application/javascript")
//       } else if (filePath.endsWith(".css")) {
//         res.setHeader("Content-Type", "text/css")
//       }
//     },
//   })
// )

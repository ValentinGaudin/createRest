const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const WildersController = require("./Controllers/WildersController");
const app = express();

async function init() {
    console.log('Wait connection');
    await mongoose.connect("mongodb://127.0.0.1:27017/wilderdb", {
        autoIndex: true
    })

    //Middleware
    app.use(express.urlencoded({ extended: true}))
    app.use(express.json())

    //HTTP Error
    app.use((res, req, next) => {
        res.status(404).send('Not found')
    })

    //Routes
    app.post("/api/wilders", WildersController.create);
    app.get("/api/wilders", WildersController.retrieve);
    app.get("/api/wilders/:id", WildersController.retrieveOne);
    app.delete('/api/wilders/:id', WildersController.delete);
    app.patch('/api/wilders/:id', WildersController.update);

    //Start Server
    app.listen(3000, () => console.log("Server started on 3000"));
    console.log('Connection is ok')

}
init();




// app.get("/", (req, res) => {
//     res.send("hello world");
//     WilderModel.init().then(() => {
//     const firstWilder = new WilderModel({
//         name: "firstWilder",
//         city: "San Franscisco",
//         skills: [
//             {title: "HTML", votes: 10},
//             {title: "CSS", votes: 5},
//         ],
//     })
// firstWilder
//     .save()
//     .then((result) => {
//         console.log("success:", result);
//     })
//     .catch((err) => {
//         console.log("error:", err);
//     });
//     })
// });

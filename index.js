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

    //Routes
    app.post("/api/wilder/create", WildersController.create);
    app.put('/api/wilder/update/:id', WildersController.update)
    app.get("/api/wilder/read", WildersController.retrieve);
    app.delete('/api/wilder/delete/:id', WildersController.delete);

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

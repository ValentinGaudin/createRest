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
    app.post("/api/wilders", WildersController.create);
    app.get("/api/wilders", WildersController.retrieve);
    app.get("/api/wilders/:id", WildersController.retrieveOne);
    app.delete('/api/wilders/:id', WildersController.delete);
    app.patch('/api/wilders/:id', WildersController.update);

    //HTTP 500 Error
    app.use((err, req, res, next) => {
        res.status(500).json({message: 'An internal error occured'})
    });

    //HTTP 404 Error
    app.use((req, res, next) => {
        res.status(404).json({message: 'Not found'})
    });

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

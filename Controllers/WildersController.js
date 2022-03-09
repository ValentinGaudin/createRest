const WilderModel = require('../models/wilder.js');

function asyncHandleRequest(handler) {
    return async function(req, res, next){
        try {
            await handler(req, res, next)
        } catch (err) {
            next(err)
        }
    }
};

module.exports = {
    create: asyncHandleRequest(async (req, res, next) => {
        try {
            WilderModel.init()
            const wilder = new WilderModel(req.body);
            const createdWilder = await wilder.save()
            res.json(createdWilder)
        } catch (error) {
            if (error.code === 11000){
                res.status(400).json({message: 'Is already taken'})
            } throw error;
        }
    }),
    retrieve: asyncHandleRequest(async (req, res, next) => {
        const allWilders = await WilderModel.find()
        res.json(allWilders);
    }),
    retrieveOne: asyncHandleRequest(async(req, res, next) => {
        const oneWilder = await WilderModel.findById(req.params['id'])
        res.json(oneWilder)
    }),
    delete: asyncHandleRequest(async(req, res, next) => {
        const wilder = await WilderModel.findByIdAndDelete(req.params['id'])
        res.json(wilder);
    }),
    update: asyncHandleRequest(async(req, res, next) => {
        const updatedWilder = await WilderModel.findByIdAndUpdate(req.params['id'], req.body)
        res.json(updatedWilder);
    }),
};
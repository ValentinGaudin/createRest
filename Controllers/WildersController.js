const WilderModel = require('../models/wilder.js');

module.exports = {
    create: async (req, res, next) => {
        try {
            WilderModel.init()
            const wilder = new WilderModel(req.body);
            const createdWilder = await wilder.save()
            res.json(createdWilder)
        } catch (error) {
            next(error)
        }
    },
    retrieve: async(req, res, next) => {
        try {
        const allWilders = await WilderModel.find()
        res.json(allWilders);
        } catch (error) {
            next(error)
        }
    },
    retrieveOne: async(req, res, next) => {
        try {
            const oneWilder = await WilderModel.findById(req.params['id'])
            res.json(oneWilder)
        } catch (error) {
            next (error)
        }
    },
    delete: async(req, res, next) => {
        try {
            const wilder = await WilderModel.findByIdAndDelete(req.params['id'])
            res.json(wilder);
        } catch (error) {
            next(error)
        }
    },
    update: async(req, res, next) => {
        try {
            const updatedWilder = await WilderModel.findByIdAndUpdate(req.params['id'], req.body)
            res.json(updatedWilder);
        } catch (error) {
            next(error)
        }
    }
};
const Type = require("../models/type");

const TypeCtrl = {};


TypeCtrl.getTypes = async (req, res, next) => {
    try{
        const save = await Type.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

TypeCtrl.createType = async (req, res, next) => {
    try{
        const { model, brand, category, cars, monitoringId } = req.body;

        const body = { model, brand, cars, monitoringId, category };
        var save= await Type.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

TypeCtrl.getType = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Type.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

TypeCtrl.editType = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Type.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

TypeCtrl.deleteType = async (req, res, next) => {
    try{
        await Type.findByIdAndRemove(req.params.id);
        res.json({ status: "Type Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = TypeCtrl;
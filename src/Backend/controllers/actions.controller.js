const Actions = require("../models/actions");

const ActionsCtrl = {};


ActionsCtrl.getActionss = async (req, res, next) => {
    try{
        const save = await Actions.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ActionsCtrl.createActions = async (req, res, next) => {
    try{
        const { title, state,sumary,monitoring,date,worker} = req.body;

        const body = { title, state,sumary,monitoring,date,worker };
        var save= await Actions.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

ActionsCtrl.getActions = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Actions.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

ActionsCtrl.editActions = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Actions.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

ActionsCtrl.deleteActions = async (req, res, next) => {
    try{
        await Actions.findByIdAndRemove(req.params.id);
        res.json({ status: "Actions Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = ActionsCtrl;
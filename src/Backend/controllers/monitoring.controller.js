const Monitoring = require("../models/monitoring");

const MonitoringCtrl = {};


MonitoringCtrl.getMonitorings = async (req, res, next) => {
    try{
        const save = await Monitoring.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

MonitoringCtrl.createMonitoring = async (req, res, next) => {
    try{
        const { name, review} = req.body;

        const body = { name, review};
        var save= await Monitoring.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

MonitoringCtrl.getMonitoring = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Monitoring.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

MonitoringCtrl.editMonitoring = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Monitoring.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

MonitoringCtrl.deleteMonitoring = async (req, res, next) => {
    try{
        await Monitoring.findByIdAndRemove(req.params.id);
        res.json({ status: "Monitoring Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = MonitoringCtrl;
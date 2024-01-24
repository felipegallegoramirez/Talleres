const Vehicle = require("../models/vehicle");

const VehicleCtrl = {};


VehicleCtrl.getVehicles = async (req, res, next) => {
    try{
        const save = await Vehicle.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

VehicleCtrl.createVehicle = async (req, res, next) => {
    try{
        const { plate, ownerName, dniOwner, year, km, actionsId,monitoringId,lastmaintenance,Nextmaintenance } = req.body;

        const body = { plate, ownerName, dniOwner, year, km, actionsId,monitoringId,lastmaintenance,Nextmaintenance };
        var save= await Vehicle.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

VehicleCtrl.getVehicle = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Vehicle.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

VehicleCtrl.editVehicle = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Vehicle.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

VehicleCtrl.deleteVehicle = async (req, res, next) => {
    try{
        await Vehicle.findByIdAndRemove(req.params.id);
        res.json({ status: "Vehicle Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = VehicleCtrl;
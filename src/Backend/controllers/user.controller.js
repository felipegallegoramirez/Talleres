const User = require("../models/user");

const UserCtrl = {};


UserCtrl.getUsers = async (req, res, next) => {
    try{
        const save = await User.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

UserCtrl.createUser = async (req, res, next) => {
    try{
        const { email, password, dni, name, phone, mechanic} = req.body;

        const body = { email, password, dni, name, phone, mechanic};
        var save= await User.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

UserCtrl.getUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await User.findById(id);
        res.status(400).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

UserCtrl.editUser = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(400).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

UserCtrl.deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndRemove(req.params.id);
        res.json({ status: "User Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};

UserCtrl.LoginUser = async (req, res, next) => {
    try{
        const { email, password} = req.body;
        const body = { email, password};
        console.log(body)
        var user = await User.findOne({ email: body.email });
        if(user.password==body.password){
            res.status(200).send(user)
        }else{
            error={
                status:"Contraseña incorrecta"
            }
            res.status(400).send(error)
        }
    }catch(err){
        res.status(400).send(err)

    }
};



module.exports = UserCtrl;
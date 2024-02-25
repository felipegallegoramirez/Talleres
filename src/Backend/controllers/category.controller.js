const Category = require("../models/category");

const CategoryCtrl = {};


CategoryCtrl.getCategorys = async (req, res, next) => {
    try{
        const save = await Category.find();
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

CategoryCtrl.createCategory = async (req, res, next) => {
    try{
        console.log("asd")
        const { name, type} = req.body;

        const body = { name, type };
        var save= await Category.create(body);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }


};

CategoryCtrl.getCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        const save = await Category.findById(id);
        res.status(200).send(save)
    }catch(err){
        res.status(400).send(err)

    }
};

CategoryCtrl.editCategory = async (req, res, next) => {
    try{
        const { id } = req.params;
        save = await Category.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).send(save)
    }catch(err){
    res.status(400).send(err)
}

};

CategoryCtrl.deleteCategory = async (req, res, next) => {
    try{
        await Category.findByIdAndRemove(req.params.id);
        res.json({ status: "Category Deleted" });
    }catch(err){
        res.status(400).send(err)
    }
};



module.exports = CategoryCtrl;
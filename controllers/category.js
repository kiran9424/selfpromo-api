const Category = require('../models/category')
exports.createCategory =async (req,res,next)=>{
    try {
        const category =  await Category.findOne({category:req.body.category})
        if(category){
            return res.status(400).json({status:'fail',message:'category already present'});
        }
        const newCategory = await Category.create(req.body);
        if(!newCategory){
            return res.status(400).json({status:'fail',message:'category can\'t be created'});
        }
        res.status(400).json({status:'success',newCategory});
    } catch (error) {
        return res.status(400).json({status:'fail',message:error});
    }
}

exports.getCategories = async (req,res,next)=>{
    try {
        const category =  await Category.find({})
        if(!category){
            return res.status(400).json({status:'fail',message:'categories not found'});
        }
        res.status(200).json({status:'success',category});
    } catch (error) {
        return res.status(400).json({status:'fail',message:error});
    }
}
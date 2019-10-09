const Product = require('../models/product');

exports.createProduct  =  (req,res,next)=>{
  
        const user = req.user;
        const productData = req.body;

        const product =  new Product(productData);
        product.author =   user;
         product.save().then(newProduct=>{
             newProduct.author.password = undefined;
            return res.status(201).json({status:'success',newProduct})
        }).catch((err)=>{
            return res.status(400).json({status:'fail',err})
        })
}

exports.getAllProducts = async (req,res,next)=>{
    const product =  await Product.find({})

    if(!product){
        res.status(400).json({status:'fail',message:'products not found'})
    }
    res.status(200).json({status:'success',product})
}

exports.getInstructorProduct = async (req,res,next)=>{
    const userId = req.user.id;
    const product = await Product.find({author:userId})
                    .populate('user')
                    .sort({updatedAt:-1});
    if(!product){
        res.status(400).json({status:'fail',message:'products not found'})
    }
    res.status(200).json({status:'success',product})
}

exports.getCourseById = async(req,res,next)=>{
    
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product){
        res.status(400).json({status:'fail',message:'products not found'})  
    }

    res.status(200).json({status:'success',product})
}
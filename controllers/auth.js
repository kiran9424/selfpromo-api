const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.registerUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ status: 'fail', message: 'user already present' })
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'password and confirm password should match' })
        }

        const newUser = await User.create(req.body);
        const tokenUser = { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        const token = jwt.sign(tokenUser, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('auth', token, {
            expiresIn: new Date(Date.now() + '1h' * 24 * 60 * 60 * 1000)
        })
        return res.status(201).json({ status: 'success', token, newUser })
    } catch (error) {
        return res.status(400).json({ status: 'fail', error })
    }

}

exports.loginUser = async (req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({ status: 'fail', message: 'user not found' })
        }
    
        const password = await user.comparePassword(req.body.password,user.password);
        if(!password){
            return res.status(400).json({ status: 'fail', message: 'user name or password is incorrect' }) 
        }
    
        const newUser = {id: user._id, name: user.name, email: user.email, role: user.role};
        const token = jwt.sign(newUser,process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('auth', token, {
            expiresIn: new Date(Date.now() + '1h' * 24 * 60 * 60 * 1000)
        })
        return res.status(201).json(token)  
    } catch (error) {
        return res.status(400).json({ status: 'fail', error })
    }
    
}

exports.checkForAuthorization = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        res.status(403).json({ status: 'fail', message: 'Your not authorized....Please login' })
    }

    const decodedToken = await promisify (jwt.verify)(token,process.env.JWT_SECRET);
    const currentUser = await User.findOne({_id:decodedToken.id})
    if (!currentUser) {
        res.status(403).json({ status: 'fail', message: 'user not found' })
    }
    req.user = currentUser;
    next();
}

exports.onlyAdmin = (req,res,next)=>{
    const user = req.user

    if(user && user['role']==='admin'){
        return next();
    }
    return res.status(401).send({errors: {auth: 'Not Authorized!'}})
}
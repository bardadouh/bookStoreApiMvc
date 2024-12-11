const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


/**
 * @desc Get Forgot Password View
 * @route /password/forgot-password
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
    res.render('forgot-password');


})


/**
 * @desc Send Forgot Password Link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */

module.exports.sendForgotPasswordLink = asyncHandler( async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).json({message: 'User not found'});

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({email: user.email, id:user.id}, secret, {expiresIn: '10m'});
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset-password/${user._id}/${token}`;
    res.json({message: 'Click on thr link', Url: resetUrl});
})

/** 
 * @desc Get Reset Password Link View
 * @route /password/reset-password/:userId/token
 * @method POST
 * @access public
 */

module.exports.getResetPasswordLinkView = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({message: 'User not found'});

    const secret = process.env.JWT_SECRET_KEY + user.password;
   
    try {
        jwt.verify(req.params.token, secret);
        res.render('reset-password', {email: user.email});       
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Invalid token'});
        
    }

})

/** 
 * @desc Reset Password The Password
 * @route /password/reset-password/:userId/token
 * @method POST
 * @access public
 */

module.exports.resetThePassword = asyncHandler( async (req, res) => {

    // TODO : validation
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({message: 'User not found'});

    const secret = process.env.JWT_SECRET_KEY + user.password;

    try {
        jwt.verify(req.params.token, secret);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)

        user.password = req.body.password;
        await user.save();
        res.render('success-password')

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Invalid token'});
        
    }

})
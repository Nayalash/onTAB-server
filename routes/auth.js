const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../utils/validation');

//REGISTER
router.post('/register', async (req,res) => {

    //Validation
    const {error} = registerValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);


    //Duplicate Entries
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) return res.status(400).send('Email Already Exists');

    //Hash
    const salt = await bcrypt.genSaltSync(10)
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);



    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({user: user._id});

    } catch(err){
        res.status(400).send(err);
    }
});


//LOGIN
router.post('/login', async (req,res) => {
    
    // Validation
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);

        // Check For Email 
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email. or Password is incorrect.');

        // Check For Password
        const validPass = await bcrypt.compareSync(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Email or Password. is incorrect');


        //Token Config
        const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);



});





module.exports = router;
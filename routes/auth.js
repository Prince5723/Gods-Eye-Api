const express = require('express');
const User = require("../models/User");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');


//Creating a user       (Private endpoint - stays only with us)

router.post('/createUser', [

    body('uid').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //checking for unique uid
    let user = await User.findOne({ uid: req.body.uid });

    if (user) {
        return res.status(400).json({ error: "A user with this uid already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const secPass = bcrypt.hashSync(req.body.password, salt);     //using bcrypt to secure password

    try {
        let user = await User.create({
            uid: req.body.uid,
            password: secPass
        })

        res.json({ user });
    } catch (error) {          //this will catch all the errors wrt to User schema.
        console.error(error.message);
        res.status(500).send("Internal error occured")
    }

})




//login for user
router.post('/login', [

    body('uid').exists(),
    body('password').exists()
], async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { uid, password } = req.body;

    try {
        let user = await User.findOne({ uid });   //finding if the user with same email exists
        if (!user) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }

        const checkPass = await bcrypt.compare(password, user.password);  //comparing password
        if (!checkPass) {
            return res.status(400).json({ error: "Please enter valid credentials" });
        }

        res.json({ msg: "login sucessfull" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured")
    }



})


module.exports = router;
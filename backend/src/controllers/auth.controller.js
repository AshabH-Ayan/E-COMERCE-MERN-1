const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//signup User
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
            // return res.status(409).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // ✅ SAVE USER INTO VARIABLE
        const user = await UserModel.create({
            name,
            email,
            password: hashPassword
        });

        // ✅ RETURN USER
        res.json({
            message: 'User created successfully',
            user   // 🔥 THIS FIXES YOUR WHOLE APP
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

//login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        res.json({ token,
            message: 'Login successful',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
         });

    } catch (error) {
        res.status(500).json({ message: 'Server login error', error: error.message });
    }
}







module.exports = {
    signupUser,
    loginUser
}
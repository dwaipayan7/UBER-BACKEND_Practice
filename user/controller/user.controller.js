import userModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

export const register = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

        console.log("Data Saved Successfully");
        
        res.cookie('token', token);
        res.status(200).json({token: token, user: newUser});
        
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({message: 'Internal server error'});
    }
}

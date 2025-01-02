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

export const login = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({msg: "Please fill in all fields"});
        }

        const user = await userModel.findOne({email});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
            
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.cookie('token', token);
        res.send({token: token, user: user});
        console.log("Logged in successfully");
        

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'});
    }
}

export const logout = async(_, res)=>{
    try {
  
        return res.status(200).cookie("token","",{maxAge:0}).json({message: 'Logged out successfully'});

    } catch (error) {
        console.log(error);
        
    }
}

export const profile = async(req, res)=>{
    try {
        
        const user = await userModel.find();
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        
    }
}
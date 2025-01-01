import userModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


module.exports.register = async(req,res) =>{
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

        const token = jwt.sign()
        
    } catch (error) {
        
    }
}

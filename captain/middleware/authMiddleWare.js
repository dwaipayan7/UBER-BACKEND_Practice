import jwt from 'jsonwebtoken';
import captainSchema from '../model/captain.model.js';

export const authMiddleWare = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            return res.status(401).json({message: 'Unauthorized'});
            
        }

        const user = await captainSchema.findById(verified.id);

        if (!user) {
            return res.status(401).json({message: 'Unauthorized'});
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({message: 'Internal server error'});
        
    }

}

export default authMiddleWare;
import jwt from "jsonwebtoken";
import User from "../models/User";

require('dotenv').config();

const checkAuth = (req,res,next)=>{
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        const {userId}=decoded;

        User.findOne({_id:userId})
            .exec()
            .then(user=>{
                if(!user){
                    return res.status(401).json({message:'Auth Failed'});
                }
                req.userData=user;
                console.log('auth success');
               return next();

            })
            .catch(error=>res.status(500).json(error))

        

    }
    catch (error) {
        return res.status(401).json({message:'Auth Failed'});
    }

};

export default checkAuth;
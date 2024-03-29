import jwt from "jsonwebtoken";
import config from "../config.js";

/**
 *
 * @param req
 * @param res
 * @param next
 * @description Middleware for checking authentication
 * @returns {error || next()}
 */
export default function (req, res, next){
 if(req.method ===  "OPTIONS"){
     next()
 }
 try{
     const token = req.header.authorization("token").split( ' ')[1]
     if(!token){
         return res.status(403).json({message: "Not authorized"})
     }
     const decodedData = jwt.verify(token, config.secret);
     req.user = decodedData;
     next();
 }catch (e){
     return res.status(401).json({message: "Not authorized"})
 }
};
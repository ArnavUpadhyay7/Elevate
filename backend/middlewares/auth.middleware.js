const playerModel = require("../models/player.model")
const coachModel = require("../models/coach.model")
const jwt = require("jsonwebtoken");

module.exports.authPlayer = async (req, res, next) => {
  
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message: 'Unauthorized'});
  }
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const player = await playerModel.findById(decoded._id);
    req.player = player;
    return next();
  }catch(error){
    return res.status(401).json({message: 'Unauthorized'});
  }
};

module.exports.authCoach = async (req, res, next) => {
  
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message: 'Unauthorized'});
  }
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const coach = await coachModel.findById(decoded._id);
    req.coach = coach;
    return next();
  }catch(error){
    return res.status(401).json({message: 'Unauthorized'});
  }
};
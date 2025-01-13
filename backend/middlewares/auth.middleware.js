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
    const player = await playerModel.findById(decoded.id);
    if (!player) {
      // console.log('Player not found');
      return res.status(404).json({ message: 'Player not found' });
    }
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
    const coach = await coachModel.findById(decoded.id);
    if (!coach) {
      // console.log('Coach not found');
      return res.status(404).json({ message: 'Coach not found' });
    }
    req.coach = coach;
    return next();
  }catch(error){
    return res.status(401).json({message: 'Unauthorized'});
  }
};
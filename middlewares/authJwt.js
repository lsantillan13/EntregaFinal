const jwt = require('jsonwebtoken');
const config = require('../config.js');
const User = require('../Models/Auth.models.js');
const Role = require('../Models/Role.js');

module.exports = {
  verifyToken: async( req, res, next ) => {
    try{
    /*-----*/
      const token = req.headers['x-access-token'];
      if(!token) return res.status(403).json({message: 'No token provided'});
      /*-----*/
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;
      /*-----*/
      const user = await User.findById(req.userId, {password: 0}) ;
      console.log(user);
      if(!user) return res.status(404).json({message: 'user not found'});
      /*-----*/
      next();
    }
    catch(err){
      return res.status(401).json({message: 'Unauthorized'});
    }
  },

  isModerator: async (req, res,next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    console.log(roles);
    for (let i = 0; i < roles.length; i++){
      if(roles[i].name === 'moderator'){
        next();
        return;
      }
    }
    return res.status(403).json({Message: 'Require Moderator Role'});
  },

  isAdmin: async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    console.log(roles);
    for(let i = 0; i < roles.length; i++){
      if(roles[i].name === 'admin'){
        next();
        return;
      }
    }
    return res.status(403).json({Message: 'Require Admin Role'});
  }
};
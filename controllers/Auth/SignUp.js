/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../../utils/config.js');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const Roles = require('../../Models/Role.js');
const User = require('../../Models/Auth.models.js');
const cfg = require('../../config.js');
/*====    //    ====*/
mongoose.connect(config.mongoDB.URL);

class AuthMongoDB{

  constructor(UserModel){ this.coleccion = UserModel; }
  async signUp(req, res){

    const { firstName, lastName, address, avatar, email, phone, age, roles } = req.body;
    try { 

      const newUser = new User({
        firstName,
        lastName,
        password: await this.coleccion.encryptPassword(req.body.password), //await bcrypt.hash(req.body.password,10),
        address,
        avatar,
        email,
        phone,
        age });

      if(roles){
        const foundRoles = await Roles.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id);
      }
      else{
        const role = await Roles.findOne({name: 'user'});
        newUser.roles = [role.id];
      }

      const savedUser = await newUser.save();

      const token = jwt.sign({id: savedUser._id}, cfg.SECRET, {
        expiresIn: 86400 // 24 hours
      });
      res
        .status(200)
        .json(token);
    }
    catch (error){ return res.status(500).json(error); }

  }

  async signIn(req, res){

    const userFound = await User.findOne({email: req.body.email}).populate('roles');

    /**/if(!userFound) return res.status(400).json({token: null, Error: 'User not found'});

    const matchPassword= await User.comparePassword(req.body.password, userFound.password);

    /**/if(!matchPassword) return res.status(401).json({Error: 'Wrong Username / Password combination', token: null});

    const token = jwt.sign({id: userFound._id}, 'terces', {expiresIn: 300});

    return res.json({auth: true, token: token, userFound});

  }
}
module.exports = AuthMongoDB;

/*
*/
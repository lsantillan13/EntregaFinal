const AuthMongoDB = require('../../controllers/Auth/SignUp.js');
const UserModel = require('../../Models/Auth.models.js');

class SignUpDAO extends AuthMongoDB{
  constructor(){
    super(UserModel);
  }
}

module.exports = SignUpDAO;
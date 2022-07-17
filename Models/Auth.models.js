const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  firstName: {  type: String, required: true },
  lastName:  {  type: String, required: true },
  password:  {  type: String, required: true },
  address:   {  type: String, required: true },
  avatar:    {  type: String, default: 'https://tualquiler.cr/wp-content/uploads/2017/03/default-user.png'},
  email:     {  type: String, required: true, unique: true },
  phone:     {  type: String, required: true },
  age:       {  type: String, required: true },
  roles:    [ {  ref:  'Role', type: Schema.Types.ObjectId } ],
});

UsersSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UsersSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

mongoose.model('users', UsersSchema);

module.exports = mongoose.model('users', UsersSchema);
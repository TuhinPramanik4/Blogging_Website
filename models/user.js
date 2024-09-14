const { createHmac,randomBytes } = require('crypto');

const {Schema,model} = require("mongoose");
const { createTokenforUser } = require('../services/authentications');

const userSchema = new Schema({
   fullName: {
    type: String,
    required: true,
   },
   email: {
    type: String ,
    required: true,
    unique: true,
   },
   salt: {
    type: String,
    
   },
   password: {
      type: String,
      required: true,

   }, 
   profileImageURL: {
    type: String,
    default: "/images/3607444.png",
   },
   role: {
      type: String,
      enum: ["USER","ADMIN"],
      default: "USER", 
   }
},{timestamps: true});
userSchema.pre('save',function (next){
    const user = this;

    if(!user.isModified("password")) return;
  
    const salt = randomBytes(16).toString();
    const hashedpassword = createHmac('sha256',salt).update(user.password).digest("hex");
    this.salt=salt;
    this.password = hashedpassword;
    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
      const user = await  this.findOne({email});
      if(!user) throw new Error ('User not found !');
      const salt = user.salt;
      const hashedpassword = user.password;

      const userprovidedHash = createHmac('sha256',salt).update(password).digest("hex");
        if(hashedpassword!== userprovidedHash) throw new Error ('Incorrect password!');
      const token = createTokenforUser(user);
      return token;
})

const User = model('user',userSchema);

module.exports =  User;
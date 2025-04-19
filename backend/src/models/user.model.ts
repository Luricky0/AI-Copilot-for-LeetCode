import mongoose, { Schema, Document } from 'mongoose'
const bcrypt = require('bcrypt');

interface Iuser extends Document{
  id: string;
  password: string;
  comparePassword(candidatePassword: string) : Promise<boolean>;
  isModified(path: string): boolean;
}

const userSchema = new Schema({
  userid:{
    type: Number,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (this: Iuser) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword:String) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const user = mongoose.model<Iuser>('user', userSchema)

export default user;
import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface Iuser extends Document {
  id: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
  isModified(path: string): boolean
}

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (this: Iuser) {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const user = mongoose.model<Iuser>('user', userSchema)

export default user

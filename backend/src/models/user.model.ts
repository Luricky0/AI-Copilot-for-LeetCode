import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'

interface IProblemRecord {
  problemId: ObjectId
  timestamp: Number
  title: String
}

interface Iuser extends Document {
  id: string
  password: string
  comparePassword(candidatePassword: string): Promise<boolean>
  isModified(path: string): boolean
  likedProblemsIDs: IProblemRecord[]
  completedProblemsIDs: IProblemRecord[]
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
  likedProblemsIDs: {
    type: [
      {
        problemId: { type: ObjectId },
        timestamp: { type: Number, default: Date.now },
        title: { type: String, default: '' },
      },
    ],
    default: [],
  },
  completedProblemsIDs: {
    type: [
      {
        problemId: { type: ObjectId },
        timestamp: { type: Number, default: Date.now },
        title: { type: String, default: '' },
      },
    ],
    default: [],
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

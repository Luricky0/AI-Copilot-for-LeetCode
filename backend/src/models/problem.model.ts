import mongoose, { Schema, Document } from 'mongoose'

interface Iproblem extends Document {
  problemNo: string
  title: string
  acceptance: number
  isPremium: boolean
  difficulty: string
  problemLink: string
  solution: string
}

const problemSchema: Schema = new Schema({
  problemNo: { type: String, required: true },
  title: { type: String, required: true },
  acceptance: { type: Number, required: true },
  isPremium: { type: Boolean, required: true },
  difficulty: { type: String, required: true },
  problemLink: { type: String, required: true },
  solution: { type: String, required: true },
})

const problem = mongoose.model<Iproblem>('problem', problemSchema)

export default problem

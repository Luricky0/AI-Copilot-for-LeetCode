import mongoose, { Schema, Document } from "mongoose";

interface IQuestion extends Document{
  questionNo: string;
  title: string;
  acceptance: number;
  isPremium: boolean;
  difficulty: string;
  questionLink: string;
  solution: string;
}

const questionSchema: Schema = new Schema({
  questionNo: { type: String, required: true },
  title: { type: String, required: true },
  acceptance: { type: Number, required: true },
  isPremium: { type: Boolean, required: true },
  difficulty: { type: String, required: true },
  questionLink: { type: String, required: true },
  solution: { type: String, required: true }
});

const Question = mongoose.model<IQuestion>('Question', questionSchema);

export default Question;
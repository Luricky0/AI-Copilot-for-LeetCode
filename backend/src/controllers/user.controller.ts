import { Request, Response } from 'express'
import User from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async(req: Request, res: Response)=>{
  const {id,password} = req.body;

  try{
    const user = await User.findOne({id});
    if(!user){
      return res.status(404).json({
        message:'User not found'
      });
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(404).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    return res.status(200).json({
      message: 'Login successful',
      token
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({
      message:'Server error'
    })
  }

}

export const register = async(req:Request, res:Response) => {
  const {id,password} = req.body;
  try{
    const user = await User.findOne({id});
    if(user){
      return res.status(404).json(
        {
        message: 'User id existed'
      }
      );
    }

    const newUser = new User({id,password})
    newUser.save();
    return res.status(201)

  }catch(error){
    console.error(error)
    return res.status(500)
  }
  
}
import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Problem from '../models/problem.model'
import { ObjectId } from 'mongodb'
import user from '../models/user.model'

export const login = async (req: Request, res: Response) => {
  const { id, password } = req.body
  console.log('here!')

  try {
    const user = await User.findOne({ id })
    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
    } else {
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        res.status(404).json({
          message: 'Invalid credentials',
        })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
      })
      res.status(200).json({
        message: 'Login successful',
        token,
      })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Server error',
    })
  }
}

export const register = async (req: Request, res: Response) => {
  const { id, password } = req.body
  try {
    const user = await User.findOne({ id })
    if (user) {
      res.status(404).json({
        message: 'User id existed',
      })
    }

    const newUser = new User({ id, password })
    await newUser.save()
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })
    res.status(201).json({
      message: 'Register successful',
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}

export const likeProblem = async(req:Request, res:Response) =>{
  const {problemId } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(400).json({ message: 'Token is required' });
  }else{
  try{
    const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);
    const userId = decoded.id;
    const user = await User.findOne({id:userId});
    if(!user){
      res.status(404).json({
        message:'User not found'
      })
    }else{
      const problem = await Problem.findById(problemId);
      if (!problem) {
        res.status(404).json({
          message: 'Problem not found',
        });
      }else{
        if(!user.likedProblemsIDs.includes(problemId)){
          user.likedProblemsIDs.push(problemId);
          await user.save();
          res.status(200).json({
            message: 'Problem liked successfully',
          });
        }else{
          user.likedProblemsIDs = user.likedProblemsIDs.filter(
            (id) => id != problemId
          );
          await user.save();
          res.status(200).json({
            message: 'Problem unliked successfully',
          });
        }
      }
    }
  }catch(error){
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
}

}

export const getLikedProblems = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(400).json({ message: 'Token is required' });
  }else{
    try {
      const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);
      const userId = decoded.id;
      const user = await User.findOne({id:userId})
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }else{
          res.status(200).json({
          likedProblemsIDs: user.likedProblemsIDs
          })
      }
      
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
}

export const completeProblem = async (req:Request, res:Response) =>{
  const {problemId} = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(400).json({ message: 'Token is required' });
  }else{
    try{
      const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);
      const user = await User.findOne({id:decoded.id});
      if(!user){
        res.status(404).json({
          message:'No such user'
        })
      }else{
        const problem = await Problem.findById(problemId);
        if (!problem) {
          res.status(404).json({
            message: 'Problem not found',
          });
        }else{
          if(!user.completedProblemsIDs.includes(problemId)){
            user.completedProblemsIDs.push(problemId);
            await user.save();
            res.status(200).json({
              message: 'Problem marked as completed successfully',
            });
          }else{
            user.completedProblemsIDs = user.completedProblemsIDs.filter(
              (id) => id != problemId
            );
            await user.save();
            res.status(200).json({
              message: 'Problem marked as not completed successfully',
            });
          }
      }

      }
    }catch(error){
      console.log(error);
    }
  }
}

export const getCompletedProblems = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(400).json({ message: 'Token is required' });
  }else{
    try {
      const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);
      const userId = decoded.id;
      const user = await User.findOne({id:userId})
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }else{
          res.status(200).json({
          completedProblemsIDs: user.completedProblemsIDs
          })
      }
      
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
  
}
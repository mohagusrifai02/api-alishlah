import 'dotenv/config';
import db from '../db.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET_KEY;

export const register = async(req,res)=>{
    const { username, email, password} = req.body;
    try {
        const hashed = await hashPassword(password);
        await db('users').insert({username, email, password:hashed});
        res.status(201).json({message:'register berhasil'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const getUser = async(req,res)=>{
    try {
        const users = await db('users').select('id','username','email');
        res.json(users);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

export const login= async(req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await db('users').where({ email }).first();
        if(!user) return res.status(404).json({error:'user tidak ditemukan'});

        const valid = await comparePassword(password, user.password);
        if(!valid) return res.status(401).json({error: 'password tidak valid'});

        const token = jwt.sign({id:user.id, email:user.email}, SECRET, {expiresIn:'1d'});
        res.json({message:'login berhasil', token});
    } catch (err) {
        res.status(500).json({error:err.message});
    }
}
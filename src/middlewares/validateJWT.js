import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'

export const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if(!token) return res.status(401).json({
    error_message: 'Token no existe'
  })

  // const { uuid } = token;
  // console.log(uuid)
  try {
    const verifiedToken  = jwt.verify(token, process.env.SECRET_OR_PRIVETE_KEY);
    const { uuid } = verifiedToken;
    const user = await User.findById(uuid).populate('role', 'name');

    if(!user) return res.status(401).json({
      error_message: 'Token Inválido - El usuario no existe'
    })

    if(!user.status) return res.status(401).json({
      error_message: 'Token Inválido - El usuario no está activo'
    })

    req.user = user;
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error_message: 'Token Inválido'
    }) 
  }
}

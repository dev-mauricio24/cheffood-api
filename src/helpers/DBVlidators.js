import { Role } from '../models/Role.js';
import { User } from '../models/User.js';

export const isEmail = async (email = '') => {
  const emailExist = await User.findOne( {email} );
  if(emailExist) 
    throw new Error('El correo ya está asociado a otro usuario');
}

export const isRole = async (role = '') => {
  const roleFound = await Role.findOne({ name: role })
  if(!roleFound) 
    throw new Error('El rol no es válido.');
} 

export const isUser = async (id = '') => {
  const user = await User.findById(id)
  if(!user) 
    throw new Error('Usuario no encontrado');
} 
import { User } from '../models/User.js';
import { generateJWT } from '../helpers/generateJWT.js';
import { validatePass } from '../helpers/encrypt.js';

export const SignIn = async(req, res) => {
  const {email, password} = req.body;
  try {
    // Verified if email exists
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })
    // Verified if user is active
    if(!user.status) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })
    // verified if password is correct
    const validPassword = validatePass(password, user.password);
    if(!validPassword) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })
    // Generate token
    const token = await generateJWT(user.id);
    res.json({
      user,
      token
    })
  } catch (error) {
    return res.status(500).json({
      error_message: 'Ocurrio un error. Por favor contacte al administrador'
    })
  }
}

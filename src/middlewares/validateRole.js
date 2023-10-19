import { Role } from '../models/Role.js'

export const isSuperAdmin = async(req, res, next) => {
  if(!req.user) 
    return res.status(500).json({
      mgs: 'No se puede validar el rol sin generar un token válido'
    })
    
  const {role, first_name} = req.user;
  try {
    const roleFound = await Role.findById(role);

    if(roleFound.name !== 'SUPER_ADMIN_ROLE') {
      return res.status(401).json({
        msg: `El usuario ${first_name} no tiene permisos de administrador`
      })
    } 
    next();
    
  } catch (error) {
    res.status(500).json({ error_message: error.message })
  }
}

// const hasRole = (...roles) => {
//   return (req, res = response, next) => {

//     if(!req.user) 
//       return res.status(500).json({
//         mgs: 'NO se puede validar el rol sin generar un token válido'
//       })

//     if(!roles.includes(req.user.role))
//       return res.status(401).json({
//         msg: `La acción requerida necesita uno de estos roles ${roles}`
//       })

//     next();
//   }
// }
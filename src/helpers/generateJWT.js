import jwt from 'jsonwebtoken';

export const generateJWT = (uuid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uuid };
    
    jwt.sign(payload, process.env.SECRET_OR_PRIVETE_KEY, {
      expiresIn: '8h'
    }, (err, token) => {
      if(err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      } 
    })
  })
}

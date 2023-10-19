import bcrypt from 'bcrypt'

export const encrypt = (password = '') => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export const validatePass = (hash, password) => bcrypt.compareSync(hash, password);
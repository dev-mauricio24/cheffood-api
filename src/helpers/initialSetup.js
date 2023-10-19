import { Role } from "../models/Role.js";
import { User } from "../models/User.js";
import { encrypt } from "./encrypt.js";

const { 
  ADMIN_FIRST_NAME, 
  ADMIN_LAST_NAME, 
  ADMIN_EMAIL, 
  ADMIN_PASSWORD 
} = process.env;


export const createRoles = async () => {
  try {
    //ya hay roles creados? ok-paro la ejecucion  : logica para crear roles Cuento documentos
    const count = await Role.countDocuments();
    if (count > 0) return;
    
    await Role.create([
      { name: "ADMIN_ROLE" },
      { name: "SUPER_ADMIN_ROLE" },
      { name: "USER_ROLE" }
    ]);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  const hash = encrypt(ADMIN_PASSWORD);
  try {
    const userFound = await User.findOne({ email: ADMIN_EMAIL });
    if (userFound) return;

    const role = await Role.findOne({name: 'SUPER_ADMIN_ROLE'});

    await User.create({
      first_name: ADMIN_FIRST_NAME,
      last_name: ADMIN_LAST_NAME,
      email: ADMIN_EMAIL,
      password: hash,
      role: role._id
    });
  } catch (error) {
    console.log(error)
  }
};

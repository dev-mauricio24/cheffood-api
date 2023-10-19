import { check } from "express-validator";
import { validateJWT } from "./validateJWT.js";
import { isSuperAdmin } from "./validateRole.js";
import { validateExpress } from "./validateExpress.js";
import { isEmail, isRole, isUser } from "../helpers/DBVlidators.js";

// USER VALIDATOR
export const postUserValidator = [
  validateJWT,
  isSuperAdmin,
  check("first_name", "El campo para los nombres es obligatorio")
    .not()
    .isEmpty(),
  check("last_name", "El campo para los apellidos es obligatorio")
    .not()
    .isEmpty(),
  check("email", "El correo no es válido!")
    .trim()
    .isEmail()
    .custom(isEmail),
  check("password", "El password debe contener al menos 6 caracteres").isLength(
    { min: 6 }
  ),
  check("role").custom(isRole),
  validateExpress,
];

export const getUserValidator = [
  validateJWT,
  isSuperAdmin,
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(isUser),
  validateExpress
]

// PRODUCTS VALIDATOR
export const postProductValidator = [
  validateJWT,
  isSuperAdmin,
  check("name", "El campo nombre es obligatorio")
    .not()
    .isEmpty(),
  check("description", "El campo descripción es obligatorio")
    .not()
    .isEmpty(),
  validateExpress,
];

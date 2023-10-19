import { Router } from "express";
import { createUser, deleteUser, getUser, getUserValidate, getUsers, updateUser } from "../controllers/user.js";
import { getUserValidator, postUserValidator } from "../middlewares/validateFields.js";
import { isSuperAdmin } from "../middlewares/validateRole.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get("/", [validateJWT, isSuperAdmin], getUsers);
router.get('/validate', [validateJWT], getUserValidate)
router.post("/", [postUserValidator], createUser);
router.get("/:id", [ getUserValidator ], getUser);
router.put("/:id", [ getUserValidator ], updateUser);
router.delete("/:id", [ getUserValidator ], deleteUser);

export default router;

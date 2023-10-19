import { encrypt } from "../helpers/encrypt.js";
import { Role } from "../models/Role.js";
import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  const { name = '', email = '' } = req.query;
  const nameRegex = new RegExp(name, 'i');
  const emailRegex = new RegExp(email, 'i');
  try {
    const users = await User.find({
      $or: [{ name }, {email: emailRegex}],
      $and: [{ status: true }]
    }).populate({
      path: "role",
      select: "name -_id",
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error_message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate({
      path: "role",
      select: "name -_id",
    });

    if (!user.status)
      return res.status(400).json({
        message: "El usuario no existe",
      });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { password, role, ...rest } = await req.body;
  const hash = encrypt(password);
  try {
    const roleFound = await Role.findOne({ name: role });
    const newUser = await User.create({
      ...rest,
      password: hash,
      role: roleFound._id,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, role, ...rest } = req.body;

  if (password) {
    const hash = encrypt(password);
    try {
      await User.findByIdAndUpdate(id, { $set: { ...rest, password: hash } });
      return res.status(200).json({
        ok: true,
        message: "El usuario ha sido actualizado",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_message: error.message });
    }
  }

  if (role) {
    try {
      const roleFound = await Role.findOne({ name: role });
      if (!roleFound)
        return res.status(400).json({
          error_message: "El rol no es válido",
        });

      await User.findByIdAndUpdate(id, {
        $set: { ...rest, role: roleFound._id },
      });
      return res.status(200).json({
        ok: true,
        message: "El usuario ha sido actualizado",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error_message: error.message });
    }
  }

  try {
    await User.findByIdAndUpdate(id, { $set: req.body });
    return res.status(200).json({
      ok: true,
      message: "El usuario ha sido actualizado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_message: error.message });
  }
};

export const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: "El usuario ha sido eliminado",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserValidate = async (req, res) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_message: error.message });
  }
}
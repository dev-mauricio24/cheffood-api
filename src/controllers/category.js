import { Category } from "../models/Category.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      ok: true,
      categories
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error_message: error.message
    })
  }
}

export const createCategory = async (req, res) => {
  const { name } = req.body
  try {
    const category = await Category.findOne({ name });

    if(category) return res.status(400).json({
      error_message: 'Ya existe la categoría.'
    })

    await Category.create({ name });

    return res.status(201).json({
      ok: true,
      message: 'La categoría ha sido creada.'
    })
  } catch (error) {
    res.status(500).json({
      error_message: error.message
    })
  }
} 

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, {$set: req.body });
    console.log(category)

    if(!category) return res.status(404).json({
      error_message: 'No se ha encontrado la categoría.'
    })

    return res.status(200).json({
      ok: true,
      message: 'La categoría ha sido actualizada.'
    })
  } catch (error) {
    res.status(500).json({
      error_message: error.message
    })
  }
} 

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    console.log(category)

    if(!category) return res.status(404).json({
      error_message: 'No se ha encontrado la categoría.'
    })

    return res.status(200).json({
      ok: true,
      message: 'La categoría ha sido eliminada.'
    })
  } catch (error) {
    res.status(500).json({
      error_message: error.message
    })
  }
} 
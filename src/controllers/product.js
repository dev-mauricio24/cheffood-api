import { removeImage, uploadImage } from "../helpers/cloudinary.js";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  const { category: query } = req.query;
  let products;

  try {
    if (!query) {
      products = await Product.find().populate('category', 'name');
    } else {
      const category = await Category.findOne({ name: query });

      if (!category)
        return res.status(400).json({
          error_message: "La categoría no es válida",
        });
        
      products = await Product.find({ category: category._id }).populate('category', 'name');
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }

  // try {
  //   const pagination = await Product.paginate(
  //     {},
  //     {
  //       page: 1,
  //       limit: 10,
  //       populate: { path: "category", select: "name" },
  //     }
  //   );

  //   const { docs, ...rest } = pagination;

  //   return res.status(200).json({
  //     ok: true,
  //     products: docs,
  //     pagination: rest,
  //   });
  // } catch (error) {
  //   return res.status(500).json({ error_message: error.message });
  // }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category", "name");

    if (!product)
      return res.status(404).json({
        error_message: "Producto no encontrado",
      });

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const categoryFound = await Category.findOne({
      name: category ? category : "típico",
    });

    if (!categoryFound)
      return res.status(400).json({
        error_message: "La categoría no existe",
      });

    const pagination = await Product.paginate(
      { category: categoryFound._id },
      { page: 1, limit: 10, populate: { path: "category", select: "name" } }
    );

    const { docs, ...rest } = pagination;

    return res.status(200).json({
      ok: true,
      products: docs,
      pagination: rest,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

export const createProduct = async (req, res) => {
  
  const { file } = req.files;
  console.log(req.user)
  const { category, ...rest } = req.body;
  let image;
  try {
    if (file) {
      const result = await uploadImage(file);

      if (!result)
        return res.status(400).json({
          error_message:
            "La extensión del archivo no es permitida use (PNG, JPG, JPEG, GIFT)",
        });
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const categoryFound = await Category.findById(category);
    if (!categoryFound)
      return res.status(400).json({
        error_message: "La categoría no existe",
      });

    const newProduct = await Product.create({
      ...rest,
      category: categoryFound._id,
      image,
    });
    res.status(201).json({
      ok: true,
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error_message: error.message,
    });
  } finally {
    await fs.remove(file.tempFilePath);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { price, ...rest } = req.body;

  try {
    if (req.files) {
      const product = await Product.findById(id);

      if (!product)
        return res.status(404).json({
          error_message: "producto no existe",
        });
      const { file } = req.files;
      const { public_id } = product.image;
      if (public_id) removeImage(public_id);

      const result = await uploadImage(file);
      await fs.remove(file.tempFilePath);

      if (!result)
        return res.status(400).json({
          error_message:
            "La extensión del archivo no es permitida use (PNG, JPG, JPEG, GIFT)",
        });
      product.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await product.save();
      return res.status(200).json({
        ok: true,
        message: `El producto ${product.name} ha sido actualizado`,
      });
    }

    const productUpdated = await Product.findByIdAndUpdate(id, {
      $set: { ...rest, price: Number(price) },
    });

    res.status(200).json({
      ok: true,
      message: `El producto ${productUpdated.name} ha sido actualizado`,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    const { public_id } = product.image;

    if (public_id) removeImage(public_id);

    res.status(200).json({
      ok: true,
      message: `El producto ${product.name} ha sido eliminado`,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

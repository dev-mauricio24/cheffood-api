import { v2 as cloudinary } from 'cloudinary';
const validateExtensions = ['png', 'jpg', 'jpeg', 'gift'];

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (file, extensions = validateExtensions) => {
  try {
    // Validar extensión del archivo
    const shorName = file.name.split('.');
    const ext = shorName[shorName.length - 1];

    if (!extensions.includes(ext)) return;
    
    return await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'virtual_menu/products',
    });
  } catch (error) {
    return error.message
  }
}

export const removeImage = (id) => cloudinary.uploader.destroy(id)


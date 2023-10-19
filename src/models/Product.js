import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    type: Number,
    default: 0
  },
  image: {
    url: String,
    public_id: String
  },
  status: {
    type: Boolean,
    default: true
  }
})

productSchema.methods.toJSON = function() {
  const {__v, status, ...data} = this.toObject();
  return data;
}

productSchema.plugin(paginate);

export const Product = model('Product', productSchema);
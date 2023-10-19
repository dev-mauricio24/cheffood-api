import { Schema, model, trusted } from 'mongoose';

const orderSchema = new Schema({
  customer: {
    type: String,
    required: true
  },
  table: {
    type: String,
    required: true
  },
  service: {
    type: Boolean,
    default: false
  },
  dishes: [
    {
      dish_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {type: Number, required: trusted}
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'processing', 'paid'],
    default: 'pending'
  },
  total: {
    type: Number,
    default: 0
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Order = model('Order', orderSchema)
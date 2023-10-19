import { Order } from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async (req, res) => {
  const { status } = req.query
  let orders
  try {
    if(!status) {
      orders = await Order.find();
    } else {
      orders = await Order.find({status}).populate({
        path: 'dishes.dish_id',
        select: 'name price quantity'
      })
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params
  const { service, dishes } = req.body
  const PERCENT_SERVICE = 0.10

  try {
    if(service && dishes.length > 0){
      const order = await Order.findById(id)
      order.dishes = Array.from(dishes)
      order.total += order.total * PERCENT_SERVICE 

      await order.save()
      return res.status(200).json(order)
    }
    const orderUpdated = await Order.findByIdAndUpdate(id, {$set: req.body}, { new: true } )
    return res.status(200).json(orderUpdated)
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
}

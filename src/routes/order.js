import { Router } from "express";
import { createOrder, getOrders, updateOrder } from "../controllers/order.js";

const router = Router()

router.get('/', getOrders)
router.post('/', createOrder)
router.patch('/:id', updateOrder)

export default router
import express from 'express';
import { getShipment, updateShipment, createShipment } from '../controllers/App_new.js';
import { getProducts} from '../controllers/shipments.js';
const router=express.Router();


 //router.get('/', getProducts);
 router.get('/{order_id}',getShipment);
 router.post('/',createShipment);
 router.patch('/',updateShipment);
//update->patch
//new doc => post
//delete => delete

export default router;
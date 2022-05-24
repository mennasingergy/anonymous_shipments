import mongoose from 'mongoose';
const postSchema=mongoose.Schema({
    shipment_status: String,
    order_id: Number,
    address: String,
});
const Shipment= mongoose.model('Shipment',postSchema);
export default Shipment;

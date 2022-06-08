const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const shipmentSchema = new Schema({
    shipment_status:String,
    order_id:Number,
    address:String,
    order_status:String
});
const ShipmentModel = mongoose.model("Shipment", shipmentSchema);

module.exports = ShipmentModel;

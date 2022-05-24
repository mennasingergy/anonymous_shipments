import Shipment from "../model/shipment.js"

export const getShimpentID=async(req,res)=>{
    try{
    const x= await Shipment.find();
    res.json(x);
    }
    catch(error){
        res.json(new error);
    }

}
export const updateOrderStatus = (req, res) => {  
    Shipment.findOneAndUpdate(
       { Order_Id: req.body.Order_Id},
        { Order_status: created } ,

       { new: true },
       (err, shipment) => {
       if (err) {
           return res.status(400).json({error: "Cannot update order status"});
       }
       res.json(shipment);
    });
};
export const updateStatus = (req, res) => {
try {
    Shipment.updateOne(
       { "Shipment_status" : "ReadyToShip" },
       { $set: {"Order_status" : "Shipped" } },
       { upsert: true }
    );
 } catch (e) {
    print(e);
 }
 try {
    Shipment.updateOne(
       { "Shipment_status" : "Shipped" },
       { $set: {"Order_status" : "Delivered" } },
       { upsert: true }
    );
 } catch (e) {
    print(e);
 }
 try {
    Shipment.updateOne(
       { "Shipment_status" : "Canceled" },
       { $set: {"Order_status" : "Returned" } },
       { upsert: true }
    );
 } catch (e) {
    print(e);
 }
 try {
    Shipment.updateOne(
       { "Order_Id" :  req.body.Order_Id},
       { $set: {"Order_status" : "Created" } },
       { upsert: true }
    );
 } catch (e) {
    print(e);
 }

}


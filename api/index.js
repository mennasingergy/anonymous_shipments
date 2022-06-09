require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const connectDB = require("./db");
const ShipmentModel = require("./mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/shipments/test', (req, res) => {
  return res.send(`Mongo URL: ${ process.env.MONGO_URI}`);
});

app.get('/api/find/:search', async (req, res) => {
  const { search } = req.params;
  //res.send("search for this product");
  await shipments.find({ "order_id": { $regex: search, $options: "i" } })
    .then(shipments => res.json(shipments))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/shipments', async (req, res) => {
  const shipment = await ShipmentModel.findOneAndUpdate({ order_Id: req.params.order_id });
  res.status(200).send({ body: shipment, message: 'Successfully retrieved shipment' });
});

app.post('/api/shipments', async (req, res) => {
  try {
    console.log('[createShipment body]', req.body)
    const { order_id } = req.body;
    if (!order_id) return res.status(403).send('order_id is required');

    const shipment = await ShipmentModel.findOne({ order_id: order_id });
    if (shipment) return res.status(403).send('Document already exists, cannot create');

    const shipmentStatus = 'CREATED';

    const newShipmentDocument = await ShipmentModel.create({ order_id: order_id, shipment_status: shipmentStatus });
    return res.status(200).send({ body: newShipmentDocument, message: 'Successfully created shipment' });
  }
  catch (e) {
    console.log('[createShipment] e', e)
  }
});

app.patch('/api/shipments', async (req, res) => {
  try {
    // const { order_id } = createShipment.order_id;
    const { order_id } = req.body;
    console.log('order_id', order_id);
    if (!order_id) return res.status(403).send('order_id is required');

    const shipment = await ShipmentModel.findOne({ order_id: order_id });
    if (!shipment) return res.status(403).send('could not find order_id');

    // fetch shipment from db for this order_id
    // determine what the current status is
    // determine what the next status should be
    // update the database with new
    const x = order_id;
    const currentShipmentStatus = shipment.shipment_status;
    const nextShipmentStatus = {
      "CREATED": 'SHIPPED',
      "SHIPPED": "DELIVERED"
    }
    [currentShipmentStatus];

    const updatedDocument = await ShipmentModel.updateOne({ order_id: order_id }, { shipment_status: nextShipmentStatus }, { returnDocument: true });
    return res.status(200).send({ body: updatedDocument, message: 'Successfully updated order status' });

  } catch (e) {
    console.log('[updateShipment] e', e)
  }
});

app.delete('/api/shipments', async (req, res) => {
  try {
    console.log('[cancelShipment body]', req.body)
    const { order_id } = req.body;
    if (!order_id) return res.status(403).send('order_id is required');

    const shipment = await ShipmentModel.findOne({ order_id: order_id });
    if (!shipment) return res.status(403).send('Shipment does not exist');

    if (shipment.shipment_status === 'CREATED') {
      await ShipmentModel.updateOne({ order_id }, { shipment_status: 'CANCELED' });
      return res.status(200).send({ body: 'CANCELED', message: 'Your Shipment has been canceled' });
    }
    return res.status(200).send({ body: shipment.shipment_status, message: 'Cannot cancel this shipments' });
  }
  catch (e) {
    console.log('[cancelShipment] e', e)
  }
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("The server is running on")
  await connectDB();
});

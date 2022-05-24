import Shipment from "../model/shipment.js"

export const getShipment = async (req, res) => {
    const shipment = await Shipment.findOneAndUpdate({ order_Id: req.param.order_id });
    res.status(200).send({ body: shipment, message: 'Successfully retrieved shipment' });
};

export const createShipment = async (req, res) => {
    try {
        console.log('[createShipment body', req.body)
        const { order_id } = req.body;
        if (!order_id) return res.status(403).send('order_id is required');

        const shipment = await Shipment.findOne({ order_id: order_id });
        if (shipment) return res.status(403).send('Document already exists, cannot create');

        const shipmentStatus = 'CREATED';

        const newShipmentDocument = await Shipment.create({ order_id: order_id }, { order_status: shipmentStatus });
        return res.status(200).send({ body: newShipmentDocument, message: 'Successfully createdf shipment' });
    }
    catch (e) {
        console.log('[createShipment] e', e)
    }
}

export const updateShipment = async (req, res) => {
    try {
        const { order_id } = req.body;
        if (!order_id) return res.status(403).send('order_id is required');

        const shipment = await Shipment.findOne({ order_id: order_id });
        if (!shipment) return res.status(403).send('could not find order_id');

        // fetch shipment from db for this order_id
        // determine what the current status is
        // determine what the next status should be
        // update the database with new
        const currentShipmentStatus = shipment.order_status;
        const nextShipmentStatus = {
            CREATED: 'SHIPPED',
            SHIPPED: 'DELIVERED'
        }[currentShipmentStatus];

        const updatedDocument = await Shipment.updateOne({ order_id: order_id }, { order_status: nextShipmentStatus }, { returnDocument: true });
        return res.status(200).send({ body: updatedDocument, message: 'Successfully updated order status' });

    } catch (e) {
        console.log('[updateShipment] e', e)
    }
}


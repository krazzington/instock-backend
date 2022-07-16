const express = require('express');
const app = express();
const PORT = 8080;
const router = express.Router();

const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
app.use(cors());
app.use(express.json());

let inventories = require('./data/inventories.json');
let warehouses = require('./data/warehouses.json');

app.get('/', (req, res) => {
    res.status(200).send('success');
});

router.get('/warehouse/${id}', (req, res) => {
    const sngWrhseID = req.params.id;
    const sngWrhseInvList = warehouseData.find(warehouse => warehouse.id === sngWrhseID);
    if (sngWrhseInvList) {
        res.send(sngWrhseInvList);
    }
    else {
        res.send("Warehouse Not Available");
    }
});




app.listen(PORT, () => {
    console.log('connected to port 8080');
});
const express = require('express');
const app = express();
const PORT = 8080;
const router = express.Router();
const warehouseRoute = require('./routes/warehouse')

const inventoryRoute = require('./routes/inventory');
const warehouseRoute = require('./routes/warehouse');

const cors = require('cors');

app.use(cors());
app.use(express.json());

let inventories = require('./data/inventories.json');
let warehouses = require('./data/warehouses.json');

// app.get('/', (req, res) => {
//     res.status(200).send('success');
// });



app.use(cors());
app.use(express.json());

// inventory route
app.use('/inventory', inventoryRoute);
// warehouse route
app.use('/warehouse', warehouseRoute);

app.listen(PORT, () => {
    console.log('connected to port 8080');
});

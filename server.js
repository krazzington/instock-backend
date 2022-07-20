const express = require('express');
const app = express();
const PORT = 8080;
const router = express.Router();

const inventoryRoute = require('./routes/inventory');
const warehouseRoute = require('./routes/warehouse');

const cors = require('cors');

app.use(cors());
app.use(express.json());

let inventories = require('./data/inventories.json');
let warehouses = require('./data/warehouses.json');

<<<<<<< HEAD
// app.get('/', (req, res) => {
//     res.status(200).send('success');
// });



app.use(cors());
app.use(express.json());

=======
>>>>>>> 01e5b221425159d0226bb3e27c7ea86c0d6be737
// inventory route
app.use('/inventory', inventoryRoute);
// warehouse route
app.use('/warehouse', warehouseRoute);

app.listen(PORT, () => {
    console.log('connected to port 8080');
});

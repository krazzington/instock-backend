const express = require('express');
const router = express.Router();
const cors = require('cors');
const uuid = require('uuid');
const fs = require('fs');
router.use(cors());

const warehouses = require('../data/warehouses.json');

// GET request of all list of Warehouses
router.get('/', (req, res) => {
  try {
    if (warehouses) {
      res.status(200).json(
        warehouses.map((warehouse) => ({
          id: warehouse.id,
          name: warehouse.name,
          address: warehouse.address,
          city: warehouse.city,
          country: warehouse.country,
          contact: {
            name: warehouse.contact.name,
            position: warehouse.contact.position,
            phone: warehouse.contact.phone,
            email: warehouse.contact.email,
          },
        }))
      );
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete('/:id', (req, res) => {
  const deletedItem = warehouses.findIndex((item) => item.id === req.params.id);
  warehouses.splice(deletedItem, 1);
  fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouses));
  res.send(warehouses);
});

<<<<<<< HEAD
router.patch ("/:id", (req, res) => {
    const { name, address, city, country contactName, position, phone, email} = req.body;
    if (phone && email) {
        warehouses.push({
            id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
             {
                contactName: req.body.contact.name,
                position: req.body.contact.position,
                phone: req.body.contact.phone,
                email: req.body.contact.email
            }
        })
        fs.writeFileSync('data/warehouses.json', JSON.stringify(warehouses));
    }
});

=======
>>>>>>> 01e5b221425159d0226bb3e27c7ea86c0d6be737
module.exports = router;

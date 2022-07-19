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

module.exports = router;

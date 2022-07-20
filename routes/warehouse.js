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

<<<<<<< HEAD
//GET inventory for single warehouse - TOM
router.get('/:id', (req, res) => {
  const sglWrhseID = req.params.id;
  const sglWrhseInvList = warehouses.find(warehouse => warehouse.id === sglWrhseID);
  if (sglWrhseInvList) {
    res.status(200).send(sglWrhseInvList);
  }
  else {
    res.status(404).send("Warehouse Not Available");
  }
});

router.delete("/:id", (req, res) => {
  const deletedItem = warehouses.findIndex((item) => item.id === req.params.id);
  warehouses.splice(deletedItem, 1);
  fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));
=======
router.delete('/:id', (req, res) => {
  const deletedItem = warehouses.findIndex((item) => item.id === req.params.id);
  warehouses.splice(deletedItem, 1);
  fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouses));
>>>>>>> 01e5b221425159d0226bb3e27c7ea86c0d6be737
  res.send(warehouses);
});

module.exports = router;

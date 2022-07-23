const express = require('express');
const router = express.Router();
const cors = require('cors');
const uuid = require('uuid');
const fs = require('fs');
router.use(cors());

const warehouses = require('../data/warehouses.json');

const emailValidation = (email) => {
  const emailRegularExpression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegularExpression.test(email);
};

const phoneValidation = (phone) => {
  const phoneRegularExpression =
    /^(\+{0,})(\d{0,})[-. ]([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
  return phoneRegularExpression.test(phone);
};

//post/create a new warehouse
router.post('/', (req, res) => {
  try {
    if (warehouses) {
      const {
        name,
        address,
        city,
        country,
        contact
      } = req.body;
      console.log(name, address, city, country, contact)
      if (
        name &&
        address &&
        city &&
        country &&
        contact &&
        (contact.name) &&
        (contact.position) &&
        phoneValidation(contact.phone) &&
        emailValidation(contact.email)
      ) {
        warehouses.push({
          id: uuid.v4(),
          name: name,
          address: address,
          city: city,
          country: country,
          contact: contact
        });
        fs.writeFileSync('data/warehouses.json', JSON.stringify(warehouses));
        res.status(200).send('Warehouse Created');
        
      } else {
        res
          .status(404)
          .json({ errorDetails: 'All fields are mandatory for submission' });
      }
    } else {
      res.status(404).json({ errorDetails: 'Warehouse could not be found' });
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

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
  res.send(warehouses);
});

module.exports = router;

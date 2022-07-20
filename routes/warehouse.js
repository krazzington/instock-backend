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

router.post('/', (req, res) => {
    try {
        if (warehouses) {
    const { name, address, city, country, contactName, position, phone, email } = req.body
    if (name && address && city && country && contactName && position && phoneValidation(phone) && emailValidation(email)){
    warehouses.push({
        id: uuid.v4(),
        name: name,
        address: address,
        city: city,
        country: country,
        contact: {
            name: contactName,
            position: position,
            phone: phone,
            email: email
        }
    })
    fs.writeFileSync('data/warehouses.json', JSON.stringify(warehouses))
    res.status(200).json(warehouses);
} else {
    res.status(404).json({errorDetails: "All fields are mandatory for submission"})
}
} else {
    res.status(404).json({errorDetails:"Warehouse could not be found"})
}
} catch(error){
    req.sendStatus(500)
}
})

module.exports = router;

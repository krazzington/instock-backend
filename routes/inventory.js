// Require Express Router
const router = require('express').Router();
const inventory = require('../data/inventories.json');
const fs = require('fs');

//GET request to get an item
router.get('/:id', (req, res) => {
  try {
    // array that contains items id
    const idItem = [];

    //map inventory to store git
    inventory.map((item) => {
      return idItem.push(item.id);
    });

    // validation to check if the array of idItems contain the params id information.
    if (!idItem.includes(req.params.id)) {
      res.status(400).send(`Bad Request`);
      return;
    }

    // response with item detail based on the id
    res.status(200).json(inventory.find((item) => item.id === req.params.id));
  } catch (error) {
    res.status(500);
  }
});

// DELETE an inventory

router.delete(`/:id`, (req, res) => {
  try {
    // Finding the index of the item in the inventory array.
    const item = inventory.findIndex((item) => item.id === req.params.id);

    // Removing the item from the inventory array.
    inventory.splice(item, 1);

    // Writing the inventory array to the inventory.json file.
    fs.writeFileSync('./data/inventories.json', JSON.stringify(inventory));

    res.status(200).send('Item Deleted');
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;

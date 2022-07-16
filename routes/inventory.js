// Require Express Router
const router = require('express').Router();
const inventory = require('../data/inventories.json');

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

module.exports = router;

// Require Express Router
const router = require('express').Router();
const inventory = require('../data/inventories.json');
const warehouse = require('../data/warehouses.json');
const uuid = require("uuid");
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


//GET all inventory items - TOM
router.get('/', (req, res) => {
  const invList = inventory.map(({ itemName, category, status, quantity, warehouseName }) => ({
    itemName,
    category,
    status,
    quantity,
    warehouseName
  }));
  res.send(invList);
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

//POST an inventory
router.post("/add", (req, res) => {
  let warehouseList = fs.readFileSync("./data/warehouses.json");
  let warehouseParse = JSON.parse(warehouseList);
  let whID = warehouseParse.filter((warehouse) => warehouse.name === req.params.id);

  const inventoryList = fs.readFileSync("./data/inventories.json");
  let inventoryParse = JSON.parse(inventoryList);

  const newItem = {
    id: uuid.v4(),
    itemName: req.body.itemName,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    status: req.body.stauts,
    warehouseName: req.body.warehouseName,
    warehouseId: whID
  };


  if (Object.keys(newItem.length === 0)) {
    return res.status(403).send("Empty Values found");
  }
  else if (req.body.quantity < 0) {
    return res.status(403).send("Quantity cannot be less than 0");
  }
  else {
    inventoryParse.push(newItem);
  }
  fs.writeFileSync("../data/inventories.json", JSON.stringify(inventory));
  res.status(201).send(inventoryParse);

});


router.patch("/:id", (req,res)=>{
  let warehouseList = fs.readFileSync("./data/warehouses.json");
  let warehouseParse = JSON.parse(warehouseList);
  let whID = warehouseParse.filter((warehouse)=> warehouse.name === req.params.id)

  let inventoryList = fs.readFileSync("./data/inventories.json");
    let inventoryParse = JSON.parse(inventoryList);
    let inventoryID = inventoryParse.filter((inventory)=> inventory.id === req.params.id)

  const updatedItem = {
    id: inventoryID,
    itemName: req.body.itemName,
    description: req.body.description,
    quantity: req.body.quantity,
    category: req.body.category,
    status: req.body.stauts,
    warehouseName: req.body.warehouseName,
    warehouseId: whID
  }
  

  if (Object.keys(updatedItem.length === 0)){
    return res.status(403).send("Empty Values found")
  }
  else if (req.body.quantity < 0){
    return res.status(403).send("Quantity cannot be less than 0")
  }
  else{
    inventoryParse.push(updatedItem)
  }
  fs.writeFileSync("../data/inventories.json", JSON.stringify(inventory))
  res.status(201).send(inventoryParse)

})


module.exports = router;

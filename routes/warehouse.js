const express = require("express");
const router = express.Router();
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
router.use(cors());

const warehouses = require("../data/warehouses.json");

console.log(warehouses);

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
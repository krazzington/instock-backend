const express = require("express");
const router = express.Router();
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
router.use(cors());

const warehouses = require("../data/warehouses.json");

console.log(warehouses);

router.delete ("/:id", (req,res) =>{
    const deletedItem = warehouses.findIndex((item) => item.id === req.params.id);
    warehouses.splice(deletedItem, 1);
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(warehouses));
    res.send(warehouses)
})

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

module.exports = router;

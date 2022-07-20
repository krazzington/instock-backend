const router = require('express').Router();
const warehouses = require('../data/warehouses.json');
const fs = require('fs');
const uuid = require('uuid');

const emailValidation = (email) => {
    const emailRegularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegularExpression.test(email)
}

const phoneValidation = (phone) => {
    const phoneRegularExpression = /^(\+{0,})(\d{0,})[-. ]([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
    return phoneRegularExpression.test(phone)
}

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
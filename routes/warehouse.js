router.put('/', (req, res) => {
    
})

router.patch('/', (req, res) => {
    const { name, address, city, country {name, position, phone, email}} = req.body;
    if (phone && email && isValidEmail(email)) {
        warehouses.push({
            id:
            name: req.body.name;
            address:
            city:
            country:
            contact: {
                name:
                position:
                phone:
                email:
            }
        })
        fs.writeFileSync('data/warehouses.json' JSON.stringify(warehouses))
    }
})
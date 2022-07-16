const express = require('express');
const app = express();
const PORT = 8080;

const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send('success')
})




app.listen(PORT, () => {
    console.log('connected to port 8080')
})
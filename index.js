
const express = require('express')
const app = express();
const upload = require("express-fileupload");

const ibanRouter = require('./routes/iban');

app.use(express.json());
app.use(upload());

app.use('/', ibanRouter);

app.use('/*', (req, res) => {
    res.sendStatus(400);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
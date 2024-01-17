const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const PORT = 5000;
const connectDB = require('./db.js');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const transactionSchema = require('./modal/transactionModal.js');
// connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api', jsonServer.router('db.json'));



// app.get('/transactions', async (req, res) => {
//     try {
//         const transactions = await transactionSchema.find();
//         res.json(transactions);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/transactions', async (req, res) => {
//     try {
//         const newTransaction = new transactionSchema(req.body);
//         await newTransaction.save();

//         res.status(201).json(newTransaction);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


app.listen(PORT, (req, res) => {
    console.log('listening on port ' + PORT);
})
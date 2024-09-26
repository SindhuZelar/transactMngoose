const express = require('express');
const mongoose = require('mongoose');
const { processTransaction } = require('./controllers/transactionController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://sindhu:sindhu@cluster0.afqjvbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch(err => {
  console.error('Database connection error', err);
});

// Endpoint to initiate a transaction
app.post('/transaction', async (req, res) => {
  const { instanceId, bonusId, player } = req.body;
  try {
    await processTransaction(instanceId, bonusId, player);
    res.status(200).send('Transaction processed successfully');
  } catch (error) {
    res.status(500).send('Transaction failed');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

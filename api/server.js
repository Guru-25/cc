// npm install express

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store items
let items = [];

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Add a new item (POST)
app.post('/items', (req, res) => {
  const { name, quantity } = req.body;
  const newItem = {
    id: items.length + 1, // Auto-incremented ID
    name,
    quantity,
    date: new Date().toISOString() // Current date
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item (PUT)
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const item = items.find((item) => item.id === parseInt(id));

  if (item) {
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.date = new Date().toISOString(); // Update date
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Delete an item (DELETE)
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});

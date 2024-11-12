const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactPortfolio');
  
  }

  main().catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
  });

const Contact = mongoose.model('Contact', contactSchema);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {
    console.log(req.body); // Log the body to check the incoming data
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch((err) => {
        console.log(err); // Log error if there's an issue
        res.status(400).send("Item was not saved to the database");
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

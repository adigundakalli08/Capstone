// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/civilloan', {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Connection error:', err));

// Define Mongoose Schemas and Models
const serviceSchema = new mongoose.Schema({
  type: String,
  code: String,
  description: String,
  imgUrl: String,
  detail: Array
});
const Service = mongoose.model('Service', serviceSchema);

const requestSchema = new mongoose.Schema({
  mobile: Number,
  email: String,
  amt: Number,
  type: String,
  msg: String,
  code: String
});
const Request = mongoose.model('Request', requestSchema);

const memberSchema = new mongoose.Schema({
  mobile: Number,
  email: String,
  occupation: String,
  createpassword: String
});
const Member = mongoose.model('Member', memberSchema);

// Define API Routes

// 1. Get all services
app.get('/allservices', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// 2. Get specific service type
app.get('/service/:type', async (req, res) => {
  try {
    const service = await Service.findOne({ type: req.params.type });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// 3. Submit a request form
app.post('/service/:type/form', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit request' });
  }
});

// 4. Register a new member
app.post('/member', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to register member' });
  }
});

// 5. Calculate loan interest
app.post('/service/:type/calculate', (req, res) => {
  const { amt, tenure } = req.body;
  if (!amt || !tenure) {
    return res.status(400).json({ error: 'Amount and tenure are required' });
  }
  const rate = 10; // Assume a fixed rate of 10%
  const interest = (amt * rate * tenure) / 100;
  res.json({ interest });
});

// 6. Update a request
app.put('/updaterequest', async (req, res) => {
  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { mobile: req.body.mobile },
      req.body,
      { new: true }
    );
    if (updatedRequest) {
      res.json({ message: 'Request updated successfully', updatedRequest });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update request' });
  }
});

// 7. Update password
app.put('/updatepassword', async (req, res) => {
  try {
    const updatedMember = await Member.findOneAndUpdate(
      { mobile: req.body.mobile },
      { createpassword: req.body.password },
      { new: true }
    );
    if (updatedMember) {
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update password' });
  }
});

// 8. Delete a request
app.delete('/deleterequest', async (req, res) => {
  try {
    const deletedRequest = await Request.findOneAndDelete({ mobile: req.body.mobile });
    if (deletedRequest) {
      res.json({ message: 'Request deleted successfully' });
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete request' });
  }
});

// 9. Cancel membership
app.delete('/cancelmember', async (req, res) => {
  try {
    const deletedMember = await Member.findOneAndDelete({ mobile: req.body.mobile });
    if (deletedMember) {
      res.json({ message: 'Membership cancelled successfully' });
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to cancel membership' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/allservices', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});


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


app.post('/service/:type/form', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit request' });
  }
});


app.post('/member', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to register member' });
  }
});


app.post('/service/:type/calculate', (req, res) => {
  const { amt, tenure } = req.body;
  if (!amt || !tenure) {
    return res.status(400).json({ error: 'Amount and tenure are required' });
  }
  const rate = 10;
  const interest = (amt * rate * tenure) / 100;
  res.json({ interest });
});


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
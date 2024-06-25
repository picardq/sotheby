import Email from '../models/Email.js';

const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: 'Email subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { subscribe };
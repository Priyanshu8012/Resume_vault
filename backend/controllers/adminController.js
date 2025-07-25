const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createAdmin, findAdminByEmail } = require('../models/adminModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.signup = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });

  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    createAdmin(email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating admin' });
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });
      res.status(201).json({ token });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields required' });

  findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Admin not found' });

    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  });
};
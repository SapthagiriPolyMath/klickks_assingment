const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (user) return res.status(400).json({ error: 'Email already exists' });
    const hashed = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed], err => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.status(200).json({ message: 'Registered successfully' });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    req.session.user = user;
    res.json({ message: 'Logged in' });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out' });
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ message: `Welcome ${req.session.user.email}` });
});

module.exports = router;

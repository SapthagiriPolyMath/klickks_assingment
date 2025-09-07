const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
        [email, hashedPassword, username],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed: users.email')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Server error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Session error' });
      }
      res.json({ message: 'Logged in' });
    });    
    res.json({ message: 'Logged in' });
  });
});


router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid', { path: '/' }); // default session cookie name
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Unauthorized' });
  res.json({ message: `Welcome ${req.session.user.username}` });
});

router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
    console.log('Session check:', req.session);
  } else {
    res.status(401).json({ loggedIn: false });
  }
});


module.exports = router;

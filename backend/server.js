const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({ origin: 'https://klickks-assingment.vercel.app', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1); // ✅ required for secure cookies on Render
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,         // ✅ ensures cookies only sent over HTTPS
    sameSite: 'none'
  }
}));

app.use('/api', authRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));

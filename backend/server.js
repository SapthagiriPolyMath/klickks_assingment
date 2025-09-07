const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Trust proxy for secure cookies on Render
app.set('trust proxy', 1);

// ✅ CORS setup
app.use(cors({
  origin: 'https://klickks-assingment.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.options('*', cors({
  origin: 'https://klickks-assingment.vercel.app',
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

app.use('/api', authRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));

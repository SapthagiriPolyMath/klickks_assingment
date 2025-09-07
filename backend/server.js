const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Trust proxy for secure cookies on Render
app.set('trust proxy', 1);

// ✅ Unified CORS options
const corsOptions = {
  origin: 'https://klickks-assingment.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

// ✅ Apply CORS globally
app.use(cors(corsOptions));

// ✅ Handle preflight requests for all routes
app.options('/*', cors(corsOptions));

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

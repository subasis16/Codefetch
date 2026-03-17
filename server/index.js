const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Supabase Init (Service Role - for server-side administrative tasks)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;
if (supabaseUrl && supabaseServiceKey && !supabaseServiceKey.startsWith('your_')) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✅ Supabase admin client initialized.');
} else {
  console.warn('⚠️  Supabase service key not configured. Server-side Supabase features are disabled.');
  console.warn('   Set SUPABASE_SERVICE_KEY in your .env file (find it in Supabase Dashboard > Settings > API > service_role key).');
}

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CodeFetch Server is running',
    supabase: supabase ? 'connected' : 'not configured',
  });
});

// Middleware to verify Supabase JWT token from the client
const verifyToken = async (req, res, next) => {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured on the server.' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
};

// Protected route example
app.post('/api/secure-action', verifyToken, async (req, res) => {
  res.json({
    message: 'Secure action endpoint',
    userId: req.user.id,
    email: req.user.email,
  });
});

// User profile endpoint
app.get('/api/profile', verifyToken, async (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at,
  });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`   http://localhost:${PORT}`);
});

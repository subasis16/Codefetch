const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Init (Service Role - only for server side administrative tasks)
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

app.get('/', (req, res) => {
  res.send('CodeFetch Server is running');
});

// Example protected route using Supabase Auth (token verification would go here)
app.post('/api/secure-action', async (req, res) => {
  // Implementation for server-side logic
  res.json({ message: "Secure action endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

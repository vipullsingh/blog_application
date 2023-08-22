const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/config');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Create HTTP server
  const server = http.createServer(app);

  // Start server
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

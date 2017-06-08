const mongoose = require('mongoose');
console.log('connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI || 'localhost');

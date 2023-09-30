
const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // You can choose any port you prefer

// Define your routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Get the correct build path for both local and Render environments
const buildPath = process.env.RENDER ? '/opt/render/project/src/build' : path.join(__dirname, 'build');

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Serving static files from: ${buildPath}`);
});

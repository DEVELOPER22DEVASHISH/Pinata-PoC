const Pinata = require('@pinata/sdk');
const express = require('express'); // Add Express for handling requests
const jwt = require('jsonwebtoken'); // Add JWT for token generation and validation

// Pinata API key and secret
const pinata = new Pinata('your-api-key');
const jwtSecret = 'your-jwt-secret';

// User-family relationships (replace with your database logic)
const familyRelationships = {
  'user1': ['familyMember1', 'familyMember2'],
  // ... other users and their family members
};

// Function to generate a unique access token with JWT
async function generateAccessToken(userId, contentId) {
  const token = jwt.sign({ userId, contentId }, jwtSecret, { expiresIn: '1h' }); // Expires in 1 hour
  return token;
}

// Function to check permissions using JWT
async function hasPermission(req, contentId) {
  const token = req.headers['authorization'];
  const decoded = jwt.verify(token, jwtSecret);
  const userId = decoded.userId;
  const familyMembers = familyRelationships[userId];
  return familyMembers.includes(req.user); // Assuming req.user holds the current user's ID
}

// Function to pin a file to IPFS
async function pinFile(userId, filename) {
  try {
    const pinFile = await pinata.pinFileToIPFS(filename);
    return pinFile.pinataMetadata.pinataContent.hash; // Return IPFS hash
  } catch (error) {
    console.error('Error pinning file:', error);
    throw error;
  }
}

// Express app for handling file sharing
const app = express();

app.post('/share', async (req, res) => {
  const { filename } = req.body;
  const userId = req.user; // Assuming req.user holds the current user's ID
  try {
    const contentId = await pinFile(userId, filename);
    const token = await generateAccessToken(userId, contentId);
    res.json({ token, url: https://gateway.pinata.cloud/ipfs/${contentId} });
  } catch (error) {
    console.error('Error sharing file:', error);
    res.status(500).send('Error sharing file');
  }
});

app.get('/access', async (req, res) => {
  const { token, contentId } = req.query;
  if (await hasPermission(req, contentId)) {
    // Fetch content from IPFS and serve it (similar to your serveContent function)
  } else {
    res.status(403).send('Unauthorized');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
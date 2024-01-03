const Pinata = require('@pinata/sdk');
const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch'); 

// Pinata API key and secret - replace with your actual values
// const pinataApiKey = 'your-api-key';
// const pinataApiSecret = 'your-api-secret';
const jwtSecret = 'your-jwt-secret';

// const pinata = new Pinata(pinataApiKey, pinataApiSecret); // .env must be there for hiding key
const pinata = new Pinata('your-api-key', { pinataJWTKey: 'your-pinata-jwt-token' });

const familyRelationships = {
  'user1': ['familyMember1', 'familyMember2'],
  // ... other users and their family members
};

async function generateAccessToken(userId, contentId) {
  try {
    const token = jwt.sign({ userId, contentId }, jwtSecret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw error;
  }
}

async function hasPermission(req, contentId) {
  try {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
    const familyMembers = familyRelationships[userId] || [];
    return familyMembers.includes(req.user);
  } catch (error) {
    console.error('Error checking permissions:', error);
    return false;
  }
}

async function pinFile(userId, filename) {
  try {
    const pinFileResponse = await pinata.pinFileToIPFS(filename);
    return pinFileResponse.data.IpfsHash;
  } catch (error) {
    console.error('Error pinning file:', error);
    throw error;
  }
}

const app = express();
app.use(express.json());

app.post('/share', async (req, res) => {
  const { filename } = req.body;
  const userId = req.user;
  try {
    const contentId = await pinFile(userId, filename);
    const token = await generateAccessToken(userId, contentId);
    res.json({ token, url: `https://gateway.pinata.cloud/ipfs/${contentId}` });
  } catch (error) {
    console.error('Error sharing file:', error);
    res.status(500).send('Error sharing file');
  }
});

app.get('/access', async (req, res) => {
  const { token, contentId } = req.query;
  if (await hasPermission(req, contentId)) {
    // Fetch content from IPFS and serve it (similar to your serveContent function)
    // Replace this comment with your logic to serve content from IPFS
    const token = req.headers['authorization']; // Assuming token is in a header
    // Check token validity and user permissions (implementation depends on chosen method)
    if (hasPermission(req.user, contentId)) {
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${contentId}`;
      // Retrieve content from IPFS and serve it to the user
      try {
        const response = await fetch(ipfsUrl);
        const data = await response.blob();
        res.type(response.headers.get('content-type'));
        // res.send(data);
    res.send('Content served from IPFS',data);
} catch (error) {
    console.error('Error fetching content from IPFS:', error);
    res.status(500).send('Error fetching content from IPFS');
  }
} else {
  res.status(403).send('Unauthorized');
}
}});
    


// Require the node-fetch package

// app.get('/access', async (req, res) => {
//   const { token, contentId } = req.query;
//   const authToken = req.headers['authorization'];

  
//     // Logic to validate the token - replace with your validation mechanism
//     return token === authToken; // Example: comparing tokens for simplicity
// //   };

// //   const hasPermission = (user, contentId) => {
// //     // Logic to check user permissions - replace with your permission checks
// //     const userId = 'user1'; // Assuming a user ID for demonstration
// //     const familyMembers = familyRelationships[userId] || [];
// //     return familyMembers.includes(user);
// //   };

//   if (await hasPermission(req.user, contentId)) {
//     const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${contentId}`;
//     try {
//       const response = await fetch(ipfsUrl);
//       const data = await response.blob();
//       res.type(response.headers.get('content-type'));
//       res.send(data);
//     } catch (error) {
//       console.error('Error fetching content from IPFS:', error);
//       res.status(500).send('Error fetching content from IPFS');
//     }
//   } else {
//     res.status(403).send('Unauthorized');
//   }
// });


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

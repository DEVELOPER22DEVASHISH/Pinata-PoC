const Pinata = require('@pinata/sdk');
// Replace with your Pinata API key
const pinata = new Pinata('your-api-key');

// Function to generate a unique access token
async function generateAccessToken() {
  try {
    const pinFile = await pinata.pinFileToIPFS('file.txt');
    const token = pinFile.pinataMetadata.pinataContent.access;
    return token;
  } catch (error) {
    console.error('Error generating access token:', error);
    throw error;
  }
}

// Function to check permissions and serve content
async function serveContent(req, res) {
  const token = req.headers['authorization']; // Assuming token is in a header
  // Check token validity and user permissions (implementation depends on chosen method)
  if (isValidToken(token) && hasPermission(req.user, contentId)) {
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${contentId}`;
    // Retrieve content from IPFS and serve it to the user
    try {
      const response = await fetch(ipfsUrl);
      const data = await response.blob();
      res.type(response.headers.get('content-type'));
      res.send(data);
    } catch (error) {
      console.error('Error fetching content from IPFS:', error);
      res.status(500).send('Error fetching content');
    }
  } else {
    res.status(403).send('Unauthorized');
  }
}


// this is for manual setup 
// Function to check if the IPFS link exists on Pinata
async function checkIPFSLinkOnPinata(link) {
  // Replace 'YOUR_API_KEY' with your Pinata API key
  const pinata = new Pinata('YOUR_API_KEY');

  try {
    const result = await pinata.testAuthentication();
    if (result.authenticated) {
      const pinataData = await pinata.pinList({ metadata: { name: link } });
      return pinataData.rows && pinataData.rows.length > 0;
    } else {
      console.error('Pinata authentication failed.');
      return false;
    }
  } catch (error) {
    console.error('Error checking IPFS link on Pinata:', error);
    return false;
  }
}

// Function to request permission to view content
async function requestContentAccess(ipfsLink) {
  const existsOnPinata = await checkIPFSLinkOnPinata(ipfsLink);

  if (existsOnPinata) {
    const confirmation = confirm('Do you want to view the content?');

    if (confirmation) {
      return 'granted';
    } else {
      return 'denied';
    }
  } else {
    return 'invalid';
  }
}

// Function to serve content if access is granted
async function serveContent(req, res) {
  const ipfsLink = 'YOUR_IPFS_LINK'; // Replace with the IPFS link you want to serve
  const accessStatus = await requestContentAccess(ipfsLink);

  if (accessStatus === 'granted') {
    const pinata = new Pinata('YOUR_API_KEY');
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsLink}`;

    try {
      const response = await fetch(ipfsUrl);
      const data = await response.blob();
      res.type(response.headers.get('content-type'));
      res.send(data);
    } catch (error) {
      console.error('Error fetching content from IPFS:', error);
      res.status(500).send('Error fetching content');
    }
  } else {
    res.status(403).send('Access denied');
  }
}


// this is for manual setup

// Function to check if the IPFS link exists on Pinata
async function checkIPFSLinkOnPinata(link) {
    // Replace 'YOUR_API_KEY' with your Pinata API key
    const pinata = new Pinata('YOUR_API_KEY');
  
    try {
      const result = await pinata.testAuthentication();
      if (result.authenticated) {
        const pinataData = await pinata.pinList({ metadata: { name: link } });
        return pinataData.rows && pinataData.rows.length > 0;
      } else {
        console.error('Pinata authentication failed.');
        return false;
      }
    } catch (error) {
      console.error('Error checking IPFS link on Pinata:', error);
      return false;
    }
  }
  
  // Function to request permission to view content
  async function requestContentAccess(ipfsLink) {
    const existsOnPinata = await checkIPFSLinkOnPinata(ipfsLink);
  
    if (existsOnPinata) {
      const confirmation = confirm('Do you want to view the content?');
  
      if (confirmation) {
        return 'granted';
      } else {
        return 'denied';
      }
    } else {
      return 'invalid';
    }
  }
  
  // Function to serve content if access is granted
  async function serveContent(req, res) {
    const ipfsLink = 'YOUR_IPFS_LINK'; // Replace with the IPFS link you want to serve
    const accessStatus = await requestContentAccess(ipfsLink);
  
    if (accessStatus === 'granted') {
      const pinata = new Pinata('YOUR_API_KEY');
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsLink}`;
  
      try {
        const response = await fetch(ipfsUrl);
        const data = await response.blob();
        res.type(response.headers.get('content-type'));
        res.send(data);
      } catch (error) {
        console.error('Error fetching content from IPFS:', error);
        res.status(500).send('Error fetching content');
      }
    } else {
      res.status(403).send('Access denied');
    }
  }
  
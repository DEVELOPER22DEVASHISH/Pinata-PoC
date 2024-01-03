// case 1 

// Function to check if the IPFS link exists on Pinata
async function checkIPFSLinkOnPinata(link) {
    // Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your Pinata API keys
    const apiKey = 'YOUR_API_KEY';
    const apiSecret = 'YOUR_API_SECRET';
    
    // API endpoint to check Pinata for the existence of the IPFS link
    const pinataEndpoint = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=${link}`;
    
    try {
      const response = await fetch(pinataEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': apiKey,
          'pinata_secret_api_key': apiSecret
        }
      });
      
      const data = await response.json();
      // Check if the response contains the link in Pinata
      return data.rows && data.rows.length > 0;
    } catch (error) {
      console.error('Error checking IPFS link on Pinata:', error);
      return false;
    }
  }
  
  // Function to request permission to view content
  async function requestContentAccess() {
    const ipfsLink = prompt('Enter the IPFS link to access content:');
  
    if (ipfsLink) {
      const existsOnPinata = await checkIPFSLinkOnPinata(ipfsLink);
      
      if (existsOnPinata) {
        alert('Access granted! You can view the content.');
        // Add logic here to load/display the content from the IPFS link
      } else {
        alert('Sorry, access denied. The content is not available or the link is invalid.');
      }
    } else {
      alert('No IPFS link provided. Access denied.');
    }
  }
  
  // Call the function to request content access
  requestContentAccess();
  // case 2
  // Function to check if the IPFS link exists on Pinata
async function checkIPFSLinkOnPinata(link) {
    // Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your Pinata API keys
    const apiKey = 'YOUR_API_KEY';
    const apiSecret = 'YOUR_API_SECRET';
  
    // API endpoint to check Pinata for the existence of the IPFS link
    const pinataEndpoint = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=${link}`;
  
    try {
      const response = await fetch(pinataEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': apiKey,
          'pinata_secret_api_key': apiSecret,
        },
      });
  
      const data = await response.json();
      // Check if the response contains the link in Pinata
      return data.rows && data.rows.length > 0;
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
        try {
          // Fetch the content from Pinata IPFS if permission is granted
          const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsLink}`);
          const blob = await response.blob(); // binary large object
          
          // Display the content (assuming it's an image)
          const objectURL = URL.createObjectURL(blob);
          const img = new Image();
          img.src = objectURL;
          document.body.appendChild(img); // Display the content in the DOM
        } catch (error) {
          console.error('Error fetching content from Pinata IPFS:', error);
          alert('Failed to fetch the content.');
        }
      } else {
        alert('Access denied. You chose not to view the content.');
      }
    } else {
      alert('Sorry, the content is not available or the link is invalid.');
    }
  }
  
  // Example usage:
  const ipfsLink = 'YOUR_IPFS_LINK'; // Replace with the IPFS link you want to check
  requestContentAccess(ipfsLink);
  
//   case 3 

// Function to check if the IPFS link exists on Pinata
async function checkIPFSLinkOnPinata(link) {
    // Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your Pinata API keys
    const apiKey = 'YOUR_API_KEY';
    const apiSecret = 'YOUR_API_SECRET';
  
    // API endpoint to check Pinata for the existence of the IPFS link
    const pinataEndpoint = `https://api.pinata.cloud/data/pinList?status=pinned&metadata[name]=${link}`;
  
    try {
      const response = await fetch(pinataEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': apiKey,
          'pinata_secret_api_key': apiSecret,
        },
      });
  
      const data = await response.json();
      // Check if the response contains the link in Pinata
      return data.rows && data.rows.length > 0;
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
  
  // Function for manual access granted
  function accessGrantedManually(ipfsLink) {
    // Perform actions for granting access manually
    console.log(`Access manually granted for IPFS link: ${ipfsLink}`);
    // You can add logic here to handle access granting
  }
  
  // Function for manual access denied
  function accessDeniedManually(ipfsLink) {
    // Perform actions for denying access manually
    console.log(`Access manually denied for IPFS link: ${ipfsLink}`);
    // You can add logic here to handle access denial
  }
  
  // Example usage:
  const ipfsLink = 'YOUR_IPFS_LINK'; // Replace with the IPFS link you want to check
  const accessStatus = await requestContentAccess(ipfsLink);
  
  switch (accessStatus) {
    case 'granted':
      // Fetch and display the content
      try {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsLink}`);
        const blob = await response.blob();
        
        // Display the content (assuming it's an image)
        const objectURL = URL.createObjectURL(blob);
        const img = new Image();
        img.src = objectURL;
        document.body.appendChild(img); // Display the content in the DOM
      } catch (error) {
        console.error('Error fetching content from Pinata IPFS:', error);
        alert('Failed to fetch the content.');
      }
      break;
    case 'denied':
      accessDeniedManually(ipfsLink);
      break;
    case 'invalid':
      alert('Sorry, the content is not available or the link is invalid.');
      break;
    default:
      break;
  }
    


//   case 4
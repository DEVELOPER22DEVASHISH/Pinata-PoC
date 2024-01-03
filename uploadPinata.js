// Import the pinata sdk package
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

// Pinata credentials
const pinataApiKey = '00cf4c9e44b270cd7d6e';
const pinataSecretApiKey = '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5';

// Create a Pinata instance
const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);

// Function to upload a file to Pinata
async function uploadFileToPinata(filePath) {
    try {
        // Read the file as a buffer
        const fileContent = fs.readFileSync(filePath);
        
        // Upload file to Pinata
        const { IpfsHash } = await pinata.pinFileToIPFS(fileContent);
        
        console.log('File uploaded successfully!');
        console.log(`IPFS Hash: ${IpfsHash}`);
    } catch (error) {
        console.error('Error uploading file to Pinata:', error);
    }
}

// Replace 'filePath' with the path to the file you want to upload
const filePath = 'C:\Users\asus\Desktop\nft collection\hello.jpg'; // Replace with your file path
uploadFileToPinata(filePath);

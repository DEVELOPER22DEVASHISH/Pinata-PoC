// no PoC available on website

// const axios = require('axios');

// const updateFileMetadata = async (ipfsPinHash, name, keyValues) => {
//     const pinataEndpoint = 'https://api.pinata.cloud/pinning/hashMetadata'; // need to know from where i can find pinata endpoint

//     const requestBody = {
//         ipfsPinHash: ipfsPinHash,
//         name: name,
//         keyvalues: keyValues
//     };

//     try {
//         const response = await axios.put(pinataEndpoint, requestBody, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'pinata_api_key': 'YOUR_PINATA_API_KEY',
//                 'pinata_secret_api_key': 'YOUR_PINATA_SECRET_API_KEY'
//             }
//         });

//         console.log(response.status); // Expected output: 200 (OK)
//     } catch (error) {
//         console.error('Error updating file metadata:', error.response.data);
//     }
// };

// // Example metadata to update (modify as needed)
// const ipfsPinHash = 'YOUR_IPFS_PIN_HASH';
// const name = 'NewNameForFile';
// const keyValues = {
//     customKey1: 'value1',
//     customKey2: 'value2'
//     // Add other key-value pairs as required
// };

// updateFileMetadata(ipfsPinHash, name, JSON.stringify(keyValues));
  

// // taking example of old file
const axios = require('axios');

const updateFileMetadata = async (ipfsPinHash, name, keyValues) => {
    const pinataEndpoint = 'https://api.pinata.cloud/pinning/hashMetadata';

    const requestBody = {
        ipfsPinHash: ipfsPinHash,
        name: name,
        keyvalues: keyValues
    };

    try {
        const response = await axios.put(pinataEndpoint, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk' // Replace with your JWT token
            }
        });

        console.log(response.status); // Expected output: 200 (OK)
    } catch (error) {
        console.error('Error updating file metadata:', error.response.data);
    }
};

// Example metadata to update (modify as needed)
const ipfsPinHash = 'QmShV1eTCstXTFGr76qZx6CAR4ShpM3D1QZ42bUM6vCyk1'; // Replace with the IPFS hash of your file
const name = 'NewNameForFile'; // shall replace the original name
const keyValues = {
    LawyerName: 'Devashish',
    ClientID: 'Client1234',       // Updated information
    ChargeCode: 'Charge000',
    Cost: 150.00                 // Updated value
    // Add other key-value pairs as required
};

updateFileMetadata(ipfsPinHash, name, keyValues);

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk';

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const filePath = 'C:\\Users\\asus\\Downloads\\jsondata.json'; // Provide the correct path to your JSON file
    const file = fs.createReadStream(filePath);

    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
        name: 'jsondata.json',
        keyvalues: {
            LawyerName: 'Lawyer001',
            ClientID: 'Client002',       // this is additonal information
            ChargeCode: 'Charge003',
            Cost: 100.00
        }
    });

    formData.append('pinataMetadata', pinataMetadata); // Append metadata to form data

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            public: true // Set to true for public, false for private
        }
    });

    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: JWT
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};

pinFileToIPFS();

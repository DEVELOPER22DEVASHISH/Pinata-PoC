const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const pinFileToIPFSWithCustomPolicy = async () => {
    const formData = new FormData();
    const filePath = 'path/to/your/file'; //
    const file = fs.createReadStream(filePath);

    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
        name: 'YourFileName.ext', // Set your file name
        keyvalues: {
            // Add any custom metadata key-values if needed
        }
    });

    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            public: false, // Set to true for public, false for private
            desiredReplicationCount: 3, // Set the desired replication count
            // Add any other custom pin policy settings as needed
        }
    });

    formData.append('pinataOptions', pinataOptions);

    try {
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'pinata_api_key': 'YOUR_PINATA_API_KEY',
                'pinata_secret_api_key': 'YOUR_PINATA_SECRET_API_KEY'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error pinning file with custom pin policy:', error);
    }
};

pinFileToIPFSWithCustomPolicy();

const axios = require('axios');

// Function to update pin policy by CID
// const updatePinPolicy = async (cid, newPinPolicy) => {
const updatePinPolicy = async ( cid, newPinPolicy) => {
    const pinataEndpoint = `https://api.pinata.cloud/pinning/pinByCID/${cid}`;
    // const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinJobs';
    // const pinataEndpoint = 'https://api.pinata.cloud';
    // const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinJobs';
    
    try {
        const pinDetailsResponse = await axios.get(pinataEndpoint, {
            headers: {
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });

        // Modify pin policy in the retrieved pin details 
        const updatedPinDetails = {
            ...pinDetailsResponse.data,
            customPinPolicy: newPinPolicy
        };

        // Update pin policy by sending a PUT request
        const updateResponse = await axios.put(pinataEndpoint, updatedPinDetails, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });

        console.log(updateResponse.data);
    } catch (error) {
        console.error('Error updating pin policy:', error.response.data);
    }
};


const cidToChange = 'QmShV1eTCstXTFGr76qZx6CAR4ShpM3D1QZ42bUM6vCyk1';
const newPinPolicy = {
    public: false // Change this value to toggle between public and private
};

updatePinPolicy(cidToChange, newPinPolicy);

const axios = require('axios');

const getUserPinnedDataTotal = async () => {
    const pinataEndpoint = 'https://api.pinata.cloud/data/userPinnedDataTotal';

    try {
        const response = await axios.get(pinataEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });

        console.log('Total Files Pinned:', response.data.pin_count);
        console.log('Total Size of All Files (in bytes):', response.data.pin_size_total);
    } catch (error) {
        console.error('Error fetching user pinned data total:', error.response.data);
    }
};

getUserPinnedDataTotal();

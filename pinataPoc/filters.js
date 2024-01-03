// this is for -> list pin by cid jobs // msg comes from pinata server // no need for poc on this 
const axios = require('axios');

const listPinByCIDJobs = async (filters) => {
    const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinJobs';

    try {
        const response = await axios.get(pinataEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': 'YOUR_PINATA_API_KEY',
                'pinata_secret_api_key': 'YOUR_PINATA_SECRET_API_KEY'
            },
            params: filters
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error listing Pin By CID jobs:', error.response.data);
    }
};

// Example filters you can apply (modify as needed)
const filters = {
    status: 'searching', // Filter by status (e.g., searching)
    limit: 10, // Number of jobs to return
    offset: 0 // Record offset for pagination
    // Add other filters as required
};

listPinByCIDJobs(filters);

// messages by pinata
// ##status##
//prechecking searching retrieving expired  over_free_limit over_max_size invalid_object bad_host_node

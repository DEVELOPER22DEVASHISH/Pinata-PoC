const axios = require('axios');

const deleteFileByCID = async (cidToDelete) => {
    const pinataEndpoint = `https://api.pinata.cloud/pinning/unpin/${cidToDelete}`;
    // const pinataEndpoint = 'https://api.pinata.cloud/pinning/unpin/{CID}';

    try {
        const response = await axios.delete(pinataEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });

        console.log('File deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting file:', error.response.data);
    }
};

// Replace 'YOUR_CID_TO_DELETE' with the CID of the file you want to delete (unpin)
const cidToDelete = 'QmUpbpJKA3kYaYSKneF4tG7Ggf2nrfKe5FThVKXqkrrRq9';

deleteFileByCID(cidToDelete);

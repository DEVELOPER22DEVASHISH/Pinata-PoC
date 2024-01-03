// this is for pinby cid when host node available  host node 

const axios = require('axios');

const pinByCIDWithHostNodes = async (cid, hostNodes) => {
    const pinataEndpoint = `https://api.pinata.cloud/pinning/pinByCID/${cid}`;

    const pinataOptions = {
        hostNodes: hostNodes
    };

    try {
        const response = await axios.post(pinataEndpoint, {
            pinataOptions: pinataOptions
        }, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error pinning by CID with host nodes:', error.response.data);
    }
};

// Replace with your actual CID and host nodes information
const cidToPin = 'QmUpbpJKA3kYaYSKneF4tG7Ggf2nrfKe5FThVKXqkrrRq9';
const hostNodes = [
    '/ip4/hostNode1ExternalIP/tcp/4001/ipfs/hostNode1PeerId',
    '/ip4/hostNode2ExternalIP/tcp/4001/ipfs/hostNode2PeerId'
    // Add other host nodes if available
];

pinByCIDWithHostNodes(cidToPin, hostNodes);

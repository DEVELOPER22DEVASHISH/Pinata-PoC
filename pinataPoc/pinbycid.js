// const axios = require('axios');

// // uploading the file that are already available on ipfs node  but not available on local machine

// // need to find pinata endpoint for pin by cid // ipfs id for multiaddress

// // const pinByCID = async (cid) => {
// const pinByCID = async () => {
//     // const pinataEndpoint = `https://api.pinata.cloud/pinning/pinByCID/${cid}`;
//     const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinByHash';

//     try {
//         const response = await axios.post(pinataEndpoint, {}, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'pinata_api_key': '00cf4c9e44b270cd7d6e',
//                 'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
//             }
//         });
        
//         console.log(response.data);
//     } catch (error) {
//         console.error('Error pinning by CID:', error.response.data);
//     }
// };

// const cidToPin = 'QmShV1eTCstXTFGr76qZx6CAR4ShpM3D1QZ42bUM6vCyk1'; // 

// pinByCID(cidToPin);
const axios = require('axios');


const pinByCID = async (hashToPin) => {
    const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinByHash';

    try {
        const response = await axios.post(pinataEndpoint, {
            hashToPin: hashToPin,
            // pinataMetadata: {} //  add metadata here if needed
        }, {
            headers: {
                'Content-Type': 'application/json',
                'pinata_api_key': '00cf4c9e44b270cd7d6e',
                'pinata_secret_api_key': '8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5'
            }
        });
        
        console.log(response.data);
    } catch (error) {
        console.error('Error pinning by CID:', error.response.data);
    }
};

const hashToPin = 'QmShV1eTCstXTFGr76qZx6CAR4ShpM3D1QZ42bUM6vCyk1'; 

pinByCID(hashToPin);

// status is showing precheking because it is already present in the network

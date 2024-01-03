// // when we upload a file to ipfs -> ipfs node will create a Cid for that file which will act as identifier and address
// // then it will pin the file to Ipfs network and make it available to the other node . at that point of time 
// // any other ipfs node can request the content for Cid and the content will pass through other node 
// // leaving the cache on that node // this makes it faster to fetch files again if those node are used 
// // pinning is what keeps content on the Ipfs node 
// // there is process of the garvage collection where ipfs node will dump any of the content that is not pinned by 
// // by the any of the node . if a item/content  is pinned then it will be in the node 

// // ## CID -> content identifier

// // hdsjfdnsahondskn3543w54edfnfsdfdnl <- this is Cide
// //ipfs breaks the file into blocks and running it through a cryptographic hash // cid will never change and will be available to other node 
// // retrival of the file by the url -> ipfs://{CID}
// // other ipfs gateways like https://gateway.pinata.cloud/ipfs/{CID} 

// // verifiablity -> for every single file CId will be unique and it can not be tempered

// //ipfs protocol url -> ipfs://dsfndlsgkdfgfddflvndlkngfldf454snfsdnl

// const axios = require('axios');

// async function pinFileToIPFS(fileUrl) {
//     const formData = new FormData();
//     console.log(fileUrl)
//     formData.append('file', fileUrl);

//     const pinningOptions = JSON.stringify({
//         cidVersion: 0,
//         customPinPolicy: {
//             public: true // Set to true for public, false for private
//         }
//     });

//     formData.append('pinataOptions', pinningOptions);

//     try {
//         const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//             headers: {
//                 'pinata_api_key': "00cf4c9e44b270cd7d6e",
//                 'pinata_secret_api_key': "8898eef030b7441e210fa2fba6ac34d68400e79512c8a7e4921046ca3575b7b5",
//                 'Content-Type': 'multipart/form-data',
//             }
//         });
//         console.log(response.data); // 
//     } catch (error) {
//         console.error('Error pinning file:', error);
//     }
// }

// // Define fileUrl and call the async function

// const fileUrl = 'C:\\Users\\asus\\Desktop\\nft_collection\\hello.jpg'; // 

// pinFileToIPFS(fileUrl);

const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "C:\\Users\\asus\\Desktop\\nft_collection\\hello.jpg";
    
    const file = fs.createReadStream(src) // making a readable stream to the file
    formData.append('file', file) // then append it to a file
    
    const pinataMetadata = JSON.stringify({
      name: 'File name',           // declare the name for the file that will appear in the App UI
    });                          // as well as when we list the files through the API.
    
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: { //need to be check
             public: true // Set to true for public, false for private
              }
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity", // for axios not to limit of the size of the request
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`, // this is for uploading files by pinata
          Authorization: JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS()
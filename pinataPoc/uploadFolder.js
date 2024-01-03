const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");  // to handle the recursive data uses combination of fs and rfs
                                    // using rfs we are going to get the directory and files within the directory
const basePathConverter = require("base-path-converter"); // this is for not to get absoulute path
// const got = require('got');


const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk'

const pinDirectoryToPinata = async () => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const src = "C:\\Users\\asus\\Desktop\\nft_collection\\pinataTest";
  var status = 0;
  try {
    const { dirs, files } = await rfs.read(src);
    let data = new FormData();
    for (const file of files) {
      data.append(`file`, fs.createReadStream(file), {
        filepath: basePathConverter(src, file),
      });
    }   
    
    const got = await import('got'); // dynamic import for got
    const response = await got.default(url, {
      method: 'POST',
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`, // boundary is for to make sure not to run size issue 
        "Authorization": JWT
      },
      body: data
    })		
    .on('uploadProgress', progress => {
	console.log(progress);
    });
    console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }
};

pinDirectoryToPinata()
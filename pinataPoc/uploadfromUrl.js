const axios = require("axios");    // axios and axios-retry which will allow us to turn a url into a readable stream.
const axiosReetry = require("axios-retry");
const FormData = require("form-data");
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk`

const uploadToPinata = async (sourceUrl) => {

  const axiosInstance = axios.create();    // creating an axiosInstance which will let us pull from a URL, 
	// axiosRetry(axiosInstance, { retries: 5 });
	axiosReetry(axios, { retries: 5 });
  console.log(axiosReetry)
  
  const data = new FormData();   //as well as create a new FormData

  const response = await axiosInstance(sourceUrl, {//creating a request using axiosInstance to get our URL,
    method: "GET",                     // which will turn it into a stream that we can append to our data
    responseType: "stream",
  });
  data.append(`file`, response.data);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxBodyLength: "Infinity",
      headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          'Authorization': JWT
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
};

uploadToPinata("https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg")

// const axios = require("axios");
// const axiosRetry = require("axios-retry");

// axiosRetry(axios, { retries: 3 });

// // Test axios retry functionality
// axios.get('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

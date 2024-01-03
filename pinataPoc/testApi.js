const sdk = require('api')('@pinata-cloud/v1.0#12ai2blmsggcsb');

sdk.auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyOTJmOTQ3Mi1lY2U0LTQyODAtOTFkNi05MWI4MjA5NmRmZmMiLCJlbWFpbCI6ImRldmFzaGlzaGJpc3dhczExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwMGNmNGM5ZTQ0YjI3MGNkN2Q2ZSIsInNjb3BlZEtleVNlY3JldCI6Ijg4OThlZWYwMzBiNzQ0MWUyMTBmYTJmYmE2YWMzNGQ2ODQwMGU3OTUxMmM4YTdlNDkyMTA0NmNhMzU3NWI3YjUiLCJpYXQiOjE3MDM2NjAwNjh9.zkPdZIzDOeQ3tKY2NOW14WDy7rM-4A4tzMGwZ6wY0Bk');
sdk.getDataTestauthentication()
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));


  // how many types of files we can upload 
  // can we change from public to private vice versa
  //persmission how to set the limit of access to how many users/which users
  //

//   Images: JPEG, PNG, GIF, BMP, SVG, etc.
// Videos: MP4, AVI, MOV, MKV, etc.
// Audio: MP3, WAV, FLAC, OGG, etc.
// Documents: PDF, DOCX, XLSX, PPTX, TXT, etc.
// Archives: ZIP, RAR, TAR, etc.
// Web Pages: HTML, CSS, JS, etc.
// 3D Models: OBJ, STL, FBX, GLTF, etc.
// Blockchain Data: JSON, XML, etc.
// Cryptographic Keys and Signatures: PGP, SSH keys, etc.
// Software Applications: Installers, executables, etc.

// how to set asking permission by sender to view the files for reciever shared over pinata   
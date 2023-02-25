const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dorkfskyc",
  api_key: "184256163935568",
  api_secret: "lTqinL81v7roe6ySV-Lk_d1F87c"
});


// Upload

const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

res.then((data: any) => {
  console.log(data);
  console.log(data.secure_url);
}).catch((err: Error) => {
  console.log(err);
});


// Generate 
const url = cloudinary.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});

export {};
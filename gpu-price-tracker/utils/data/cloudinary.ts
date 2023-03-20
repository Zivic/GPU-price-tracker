import * as dotenv from "dotenv";
const cloudinary = require("cloudinary").v2;

const UploadImage = (image: string, publicId: string) => {
  dotenv.config();

  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  // Upload
  const res = cloudinary.uploader.upload(image, {
    public_id: publicId,
    overwrite: false,
  });

  res
    .then((data: any) => {
      console.log(data);
      // console.log(data.secure_url);
    })
    .catch((err: Error) => {
      console.log(err);
    });

  // Generate
  const url = cloudinary.url(publicId, {
    //   width: 100,
    //   height: 150,
    // Crop: 'fill'
  });

  return url;
};

export { UploadImage };

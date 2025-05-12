import multer from "multer";
import path, { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import { rejects } from "assert";

// Configuration
cloudinary.config({
  cloud_name: "dz6tblanj",
  api_key: "949211445468121",
  api_secret: "FGBOzaycUN9IEWKNUJCmx9LX0qc", // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload an image
const uploadCloudaniry = async (file: any) => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname,
      },
      (error, result) => {
        if (error) {
          rejects(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const FileUploaders = {
  upload,
  uploadCloudaniry,
};

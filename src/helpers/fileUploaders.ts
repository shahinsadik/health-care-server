import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { ICloudinaryResponse, IFile } from "../app/interfaces/file";
import config from "../config";

// Configuration
cloudinary.config({
  cloud_name: config.cloudnary.cloud_name,
  api_key: config.cloudnary.api_key,
  api_secret: config.cloudnary.api_secret, // Click 'View API Keys' above to copy your API secret
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
const uploadCloudaniry = async (
  file: IFile
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, rejects) => {
    cloudinary.uploader.upload(
      file.path,

      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path);
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

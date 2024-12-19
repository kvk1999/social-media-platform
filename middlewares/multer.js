import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory for further processing

const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images and videos are allowed."));
    }
  },
}).single("file");

export default uploadFile;

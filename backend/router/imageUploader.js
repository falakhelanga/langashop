import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,

      `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileType.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb("this is not an invalid image");
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
router.post("/", upload.single("image"), (req, res, next) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

const storage2 = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,

      `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType2 = (file, cb) => {
  const fileType = /jpg|jpeg|png/;
  const extname = fileType.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimeType = fileType.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb("this is not an invalid image");
  }
};

const upload2 = multer({
  storage: storage2,
  fileFilter: function (req, file, cb) {
    checkFileType2(file, cb);
  },
});
router.post("/images", upload2.single("images"), (req, res, next) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

export default router;

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer"); 
const app = express();
const PORT = 3000;
const path = require("path");
const uploadToServer = require("./utils/uploadImage");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(bodyParser.json());

app.post("/api/storeImage", upload.single("imageData"), async (req, res) => {
  try {
    const imageData = req.file;
    console.log(imageData);
    if (!imageData) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadImage = await uploadToServer(
      imageData?.path,
      imageData.filename
    );

    if (!uploadImage) {
      return res.status(400).json({ error: "Error uploading file" });
    }

    res.json(uploadImage);
  } catch (error) {
    console.error("Error storing image:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Main server is running on port ${PORT}`);
});



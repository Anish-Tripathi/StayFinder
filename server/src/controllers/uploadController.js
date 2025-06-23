const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadType = req.baseUrl.includes("avatar") ? "avatars" : "messages";
    const fileUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${uploadType}/${req.file.filename}`;

    res.status(200).json({
      url: fileUrl,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
};

export default uploadFile;

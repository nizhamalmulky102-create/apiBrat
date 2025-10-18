// Brat Text Generator API
// by Ikyyy — Deploy-ready version

import express from "express";
import sharp from "sharp";

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint utama
app.get("/api/brat", async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Tambahkan parameter ?text= di URL",
      });
    }

    // SVG -> PNG: gaya Brat
    const svg = `
    <svg width="800" height="400">
      <rect width="100%" height="100%" fill="#ffc0cb" rx="40" ry="40"/>
      <text x="50%" y="50%" font-size="72" fill="#000"
        text-anchor="middle" font-family="Comic Sans MS, cursive" dy=".3em">
        ${text}
      </text>
    </svg>`;

    const image = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(image);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ status: false, message: "Server error!" });
  }
});

app.get("/", (req, res) => {
  res.send("🩷 Brat API by Ikyyy aktif! Gunakan endpoint: /api/brat?text=IkyyyStore");
});

app.listen(PORT, () => console.log(`🚀 Brat API berjalan di port ${PORT}`));

const express = require("express");
const router = express.Router();
const { searchCSV } = require("../utils/csvLoader");

router.get("/", async (req, res) => {
  const query = req.query.search;

  if (!query || query.trim() === "") {
    console.log("❌ Blank search request received.");
    return res.json({ total: 0, data: [] });
  }

  console.log(`🔍 Searching for: "${query}" ...`);

  const results = await searchCSV(query);

  console.log(`✅ Search Complete → Found ${results.length} matches`);

  res.json({
    total: results.length,
    data: results.slice(0, 50)
  });
});

module.exports = router;

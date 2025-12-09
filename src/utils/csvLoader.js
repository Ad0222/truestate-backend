const csv = require("csv-parser");
const fetch = require("node-fetch");
const { Readable } = require("stream");

const CSV_URL =
  "https://drive.google.com/file/d/1WpgRyEN3N5A8-8nUohVoZNkhhVhEocds/view?usp=drive_link";

// Convert CSV text into stream for csv-parser
function textToStream(text) {
  return Readable.from(text);
}

async function fetchCSVFromURL() {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const results = [];

    return new Promise((resolve, reject) => {
      textToStream(csvText)
        .pipe(csv())
        .on("data", (row) => results.push(row))
        .on("end", () => {
          console.log("✔ CSV Loaded from Google Drive:", results.length, "rows");
          resolve(results);
        })
        .on("error", (err) => reject(err));
    });
  } catch (error) {
    console.error("❌ Error fetching CSV:", error);
    return [];
  }
}

async function searchCSV(keyword) {
  const searchValue = keyword.toLowerCase();
  const allData = await fetchCSVFromURL();

  const filtered = allData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchValue)
  );

  console.log(`🔍 Search: "${keyword}" → ${filtered.length} result(s)`);

  return filtered;
}

module.exports = { searchCSV };

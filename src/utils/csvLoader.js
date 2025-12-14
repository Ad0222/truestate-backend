const fs = require("fs");
const csv = require("csv-parser");

const CSV_PATH = "./data/truestate_assignment_datasets.csv";

async function loadCSV() {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        console.log(`✔ Local CSV Loaded: ${results.length} rows`);
        resolve(results);
      })
      .on("error", (err) => reject(err));
  });
}

async function searchCSV(keyword) {
  const searchValue = keyword.toLowerCase();

  const allData = await loadCSV();

  const filtered = allData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(searchValue)
  );

  console.log(`🔍 Search: "${keyword}" → ${filtered.length} results`);

  return filtered;
}

module.exports = { searchCSV };

const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// NO CSV LOADING IN MEMORY NOW
console.log("CSV Streaming Mode Enabled: Full CSV Search Active");

app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.send("Retail Backend Running Successfully ✔️");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

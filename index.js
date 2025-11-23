import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

// LOG FILE PATH
const logFile = path.resolve("postback_logs.json");

// Ensure file exists
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, JSON.stringify([]));
}

app.get("/postback", (req, res) => {
  const { s1, payout, offer_id } = req.query;

  console.log("POSTBACK RECEIVED:");
  console.log("User ID (s1):", s1);
  console.log("Payout:", payout);
  console.log("Offer ID:", offer_id);

  // Create log object
  const logEntry = {
    userId: s1 || null,
    offerId: offer_id || null,
    payout: payout || null,
    timestamp: new Date().toISOString(),
  };

  // Read old logs
  const existingLogs = JSON.parse(fs.readFileSync(logFile, "utf8"));

  // Add new log
  existingLogs.push(logEntry);

  // Write back to file
  fs.writeFileSync(logFile, JSON.stringify(existingLogs, null, 2));

  res.status(200).send("OK");   
});

app.listen(3000, () => console.log("Server running on 3000"));

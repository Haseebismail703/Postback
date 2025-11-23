import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/postback", (req, res) => {
  const { s1, payout, offer_id } = req.query;

  console.log("POSTBACK RECEIVED:");
  console.log("User ID (s1):", s1);
  console.log("Payout:", payout);
  console.log("Offer ID:", offer_id);

  // Hamesha OK return karo warna network error ayega
  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server running on 3000"));
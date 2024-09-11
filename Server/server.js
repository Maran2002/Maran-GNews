// server.js
const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [ ], // Replace with your frontend URLs Here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

const GNEWS_API_KEY = process.env.GNEWS_API_KEY; // set your GNews api key here or in environment variables
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

// Fetch news from gnews.io API
app.get("/api/news", async (req, res) => {
  const { query, lang, country, max, page = 1 } = req.query;
  try {
    const response = await fetch(
      `${GNEWS_BASE_URL}/search?q=${query}&token=${GNEWS_API_KEY}&lang=${lang}&country=${country}&page=${page}&max=${max}`
    );
    const data = await response.json();

    if (response.ok) {
      res.json(data);
    } else {
      res.status(response.status).json({ error: data.message });
    }
    // res.json(sample)
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require("express");
const morganMiddleware = require("./middleware/logger");
const axios = require("axios");


// The morgan middleware does not need this.
// This is for a manual log
const logger = require("./logger/");

const app = express();

// Add the morgan middleware
app.use(morganMiddleware);

app.get("/crypto", async (req, res) => {
  try {
    const response = await axios.get("https://api2.binance.com/api/v3/ticker/24hr");

    const tickerPrice = response.data;

    res.json(tickerPrice);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal server error");
  }
});

// Startup
app.listen(8001, () => {
  logger.info("Server is running on port 3000");
});

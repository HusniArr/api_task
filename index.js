const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const taskRoute = require("./routes/taskRoute");

// fetch file .env
dotenv.config();

app.use(logger);
// enable all cors request
app.use(cors());
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));

// connection mongodb
main().catch( err => console.log(err));

app.use("/", taskRoute);

async function main() {
    console.log("Connect to db successfully...");
    await mongoose.connect(process.env.MONGO_URL);
}
app.use(errorHandler);
// running server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


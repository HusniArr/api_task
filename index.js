const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const taskRoute = require("./routes/taskRoute");

// fetch file .env
dotenv.config();

// enable all cors request
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connection mongodb
main().catch( err => console.log(err));

app.use("/", taskRoute);

async function main() {
    console.log("Connect to db successfully...");
    await mongoose.connect(process.env.MONGO_URL);
}

// running server
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});


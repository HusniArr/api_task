const express = require("express");
const router = express.Router();

router.get("/tasks", (req, res) => {
   res.status(200).json({
    message: "ini request of all tasks"
   }); 
});

module.exports = router;
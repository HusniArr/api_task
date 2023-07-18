const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/Task");
const { getAllTask, newTasks, getTaskById, updateTask, deleteTask } = require("../controllers/TaskController");

router.get("/tasks", getAllTask);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateTask, newTasks);
router.patch("/tasks/:id", validateTask, updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
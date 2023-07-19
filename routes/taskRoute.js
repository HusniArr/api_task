const express = require("express");
const router = express.Router();
const { getAllTask, newTasks, getTaskById, updateTask, deleteTask } = require("../controllers/TaskController");

router.get("/tasks", getAllTask);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", newTasks);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
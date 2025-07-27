import express from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// POST /api/projects/:projectId/tasks - Create a task (check project ownership)
router.post("/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      project: project._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:projectId/tasks - List all tasks for a project
router.get("/:projectId/tasks", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const tasks = await Task.find({ project: project._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:taskId - Update a task (check project ownership)
router.put("/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized for this task" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:taskId - Delete a task (check project ownership)
router.delete("/tasks/:taskId", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized for this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

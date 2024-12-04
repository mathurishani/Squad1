import express from "express";
import { Assignment } from "../models/assignmentModel.js";

const router = express.Router();

// Endpoint to save assignments
router.post("/", async (request, response) => {
  try {
    const { assignments } = request.body;

    // Insert assignments into the database
    const savedAssignments = await Assignment.insertMany(assignments);
    response
      .status(201)
      .json({
        message: "Assignments saved successfully",
        data: savedAssignments,
      });
  } catch (error) {
    console.error("Error saving assignments:", error);
    response.status(500).json({ error: "Failed to save assignments" });
  }
});

// Route for fetching assignments based on emp_id
router.get('/emp_id/:emp_id', async (request, response) => {
  try {
    const { emp_id } = request.params;

    const assignments = await Assignment.find({ emp_id: emp_id });
    
    if (assignments.length === 0) {
      return response.status(404).send({ message: 'No assignments found for this employee.' });
    }

    response.status(200).json(assignments);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: 'Failed to fetch assignments.' });
  }
});


export default router;

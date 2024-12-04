import express from 'express';
import {Employee} from '../models/employeeModel.js';
import e from 'express';

const router = express.Router();

// route for squad login
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({
        message: '400 Email and password are required',
      });
    }

    // Find employee by email
    const employee = await Employee.findOne({ email });

    // Convert password to a number for comparison
    const eidAsNumber = parseInt(password, 10);

    // Check if employee exists and the password matches their `eid`
    if (!employee || employee.eid !== eidAsNumber) {
      return response.status(401).send({ message: "Invalid email or password." });
    }

    // Return success with `eid`
    return response.status(200).send({ eid: employee.eid });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Server error. Please try again." });
  }
});

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
        !request.body.eid ||
        !request.body.ename ||
        !request.body.address ||
        !request.body.collegeid ||
        !request.body.yr_of_exp ||
        !request.body.yr_of_exp_in_squad ||
        !request.body.zone ||
        !request.body.subject_id || 
        !request.body.phone ||
        !request.body.email
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newEmployee = {
      eid: request.body.eid,
        ename: request.body.ename,
        address: request.body.address,
        collegeid: request.body.collegeid,
        yr_of_exp: request.body.yr_of_exp,
        yr_of_exp_in_squad: request.body.yr_of_exp_in_squad,
        zone: request.body.zone,
        subject_id: request.body.subject_id,
        phone: request.body.phone,
        email: request.body.email,
    };

    const employee = await Employee.create(newEmployee);

    return response.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});

    return response.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/eid/:eid', async (request, response) => {
  try {
    const { eid } = request.params;

    const employee = await Employee.findOne({eid: eid});

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:eid', async (request, response) => {
  try {
    if (
      !request.body.ename ||
      !request.body.collegeid ||
      !request.body.zone ||
      !request.body.subject_id
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    const result = await Employee.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Emp not found' });
    }

    return response.status(200).send({ message: 'Emp updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:eid', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Emp not found' });
    }

    return response.status(200).send({ message: 'Emp deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

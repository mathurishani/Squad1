import express from 'express';
import {College} from '../models/collegeModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
        !request.body.cid ||
        !request.body.cname ||
        !request.body.address ||
        !request.body.czone
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newCollege = {
        cid: request.body.cid,
        cname: request.body.cname,
        address: request.body.address,
        czone: request.body.czone,
    };

    const college = await College.create(newCollege);

    return response.status(201).send(college);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const colleges = await College.find({});

    return response.status(200).json({
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/cid/:cid', async (request, response) => {
  try {
    const { cid } = request.params;

    const college = await College.findOne({cid: cid});

    return response.status(200).json(college);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
// router.put('/:cid', async (request, response) => {
//   try {
//     if (
//       !request.body.ename ||
//       !request.body.collegeid ||
//       !request.body.zone ||
//       !request.body.subject_id
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields',
//       });
//     }

//     const { id } = request.params;

//     const result = await College.findByIdAndUpdate(id, request.body);

//     if (!result) {
//       return response.status(404).json({ message: 'Emp not found' });
//     }

//     return response.status(200).send({ message: 'Emp updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Delete a book
// router.delete('/:eid', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await College.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: 'Emp not found' });
//     }

//     return response.status(200).send({ message: 'Emp deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

export default router;

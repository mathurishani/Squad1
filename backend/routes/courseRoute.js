import express from 'express';
import {Course} from '../models/courseModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
       !request.body.course_id ||
         !request.body.course_name
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newCourse = {
         course_id: request.body.course_id,
            course_name: request.body.course_name,
    };

    const course = await Course.create(newCourse);

    return response.status(201).send(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const courses = await Course.find({});

    return response.status(200).json({
      count: courses.length,
      data: courses,
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

    const course = await Course.findOne({cid: cid});

    return response.status(200).json(course);
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
//       !request.body.courseid ||
//       !request.body.zone ||
//       !request.body.subject_id
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields',
//       });
//     }

//     const { id } = request.params;

//     const result = await Course.findByIdAndUpdate(id, request.body);

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

//     const result = await Course.findByIdAndDelete(id);

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

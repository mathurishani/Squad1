import express from 'express';
import {Exam} from '../models/examModel.js';

const router = express.Router();

// Route for Save a new Book
router.post('/', async (request, response) => {
  try {
    if (
        !request.body.exam_id ||
        !request.body.course_id ||
        !request.body.exam_date
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }
    const newExam = {
       exam_id: request.body.exam_id,
         course_id: request.body.course_id,
            exam_date: request.body.exam_date,
    };

    const exam = await Exam.create(newExam);

    return response.status(201).send(exam);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const exams = await Exam.find({});

    return response.status(200).json({
      count: exams.length,
      data: exams,
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

    const exam = await Exam.findOne({cid: cid});

    return response.status(200).json(exam);
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
//       !request.body.examid ||
//       !request.body.zone ||
//       !request.body.subject_id
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields',
//       });
//     }

//     const { id } = request.params;

//     const result = await Exam.findByIdAndUpdate(id, request.body);

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

//     const result = await Exam.findByIdAndDelete(id);

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

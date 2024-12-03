import mongoose from 'mongoose';

const examSchema = mongoose.Schema(
  {
    exam_id:{
      type: String,
      required: true,
    },
    course_id: {
      type: Number,
      required: true,
    },
    exam_date: {
      type: Date,
      required: true,
    },
  }
  
);

export const Exam = mongoose.model('Exam', examSchema);

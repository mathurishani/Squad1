import mongoose from 'mongoose';

const assignmentSchema = mongoose.Schema(
  {
    emp_id: {
      type: Number,
      required: true,
    },
    emp_name: {
      type: String,
      required: true,
    },
    college_cid: {
      type: Number,
      required: true,
    },
    college_cname: {
      type: String,
      required: true,
    },
    college_address: {
      type: String,
      required: true,
    },
    college_zone: {
      type: Number,
      required: true,
    },
    course_id: {
      type: Number,
      required: true,
    },
    exam_id: {
      type: String,
      required: true,
    },
    exam_date: {
      type: Date,
      required: true,
    },
  },
  
);

export const Assignment = mongoose.model('Assignment', assignmentSchema);

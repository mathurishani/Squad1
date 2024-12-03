import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
  {
    course_id: {
      type: Number,
      required: true,
    },
    course_name: {
      type: String,
      required: true,
    },
   
  }
  
);

export const Course = mongoose.model('Course', courseSchema);

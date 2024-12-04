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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } } // Enable virtuals
);

// Virtual to format exam_date
examSchema.virtual('formatted_date').get(function () {
  const date = new Date(this.exam_date);
  return date.toISOString().split('T')[0]; // yyyy-mm-dd
});

export const Exam = mongoose.model('Exam', examSchema);

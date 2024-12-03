import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema(
  {
    cid: {
      type: Number,
      required: true,
    },
    cname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    czone: {
      type: String,
      required: true,
    },
  }
  
);

export const College = mongoose.model('College', collegeSchema);

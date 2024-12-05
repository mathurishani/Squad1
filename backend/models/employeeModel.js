import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  eid: {
    type: Number,
    required: true,
  },
  ename: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  collegeid: {
    type: Number,
    required: true,
  },
  yr_of_exp: {
    type: Number,
    required: true,
  },
  yr_of_exp_in_squad: {
    type: Number,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  subject_ids: {
    type: [Number], // Array to hold multiple course IDs
    validate: {
      validator: function (v) {
        return v.length <= 3; // Limit to 3 subjects per employee
      },
      message: "An employee can be assigned up to 3 courses.",
    },
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export const Employee = mongoose.model("Employee", employeeSchema);

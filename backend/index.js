import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import collegeRoute from "./routes/collegeRoute.js";
import courseRoute from "./routes/courseRoute.js";
import examRoute from "./routes/examRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// // Middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// // Option 2: Allow Custom Origins
// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //     allowedHeaders: ['Content-Type'],
// //   })
// // );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to the Bookstore API');
});

app.use('/books', booksRoute);
app.use('/employees', employeeRoute);
app.use('/colleges', collegeRoute);
app.use('/courses', courseRoute);
app.use('/exams', examRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

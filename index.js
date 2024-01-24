import express from "express";

import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./backend/models/bookModel.js";
import booksRoute from "./backend/routes/booksRoutes.js"
import cors from 'cors';


const app = express();
app.use(express.json());

//middleware for handling cors  policy
//Option #1 Allow all origins with default of cors(*)
//app.use(cors());

//Option #2 Allow all origins with default of cors(*)
app.use(cors({
    origin: 'http//localhost:3000',
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-Type'],
}));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Mern Stack Tutorial");
});

//SETS /BOOKS FOR ALL ROUTES AS  DEFAULT E.I /BOOKS/:ID
app.use('/books', booksRoute);

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

import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { protect } from './middleware/authMiddleware.js';
import booksRoutes from "./routes/booksRoute.js";
import studentsRoutes from "./routes/studentsRoute.js";
import borrowsRoutes from "./routes/borrowsRoute.js";
import authRoutes from './routes/authRoute.js';
import librarianRoutes from "./routes/librarianRoutes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'image')));

app.use('/image', express.static(path.join(__dirname, 'image')));
//Middleware
app.use((req, res, next) => {
   console.log('path' + req.path + ' method' + req.method);
   next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//    res.send("Hello world");
// });

//DB conncection
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      app.listen(process.env.PORT, () => {
         console.log("DB connected Successfully and listening to " + process.env.PORT);
      });

   })
   .catch((error) => console.log(error));

app.use('/libo/student', studentsRoutes);
app.use('/libo/book', booksRoutes);
app.use('/libo/borrow', borrowsRoutes);
app.use('/libo/librarian', librarianRoutes);
app.use('/libo/auth', authRoutes);
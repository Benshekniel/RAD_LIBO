import express from "express";
import 'dotenv/config'
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoute.js"

const app = express();

//Middleware
app.use((req, res, next) => {
   console.log('path' + req.path + ' method' + req.method);
   next();
});

app.use(express.json());
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

app.use('/libo', booksRoutes);
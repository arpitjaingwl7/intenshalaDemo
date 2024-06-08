import express from "express";
import "dotenv/config";
import userRouter from "./Router/user.js";
import mongoose from "mongoose";
import cors from "cors"

let server = express();
let port = process.env.PORT || 3030;

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};

// middlewares 
server.use(cors(corsOptions));
server.use(express.json()); // This will help us to read Body of request
server.use("/", userRouter);



// const corsOptions = {
//   origin: '*', // Allow all origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
//   allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization' // Allow specific headers
// };
server.use(cors())
// server.options('*', cors(corsOptions)); 
// DB connection 
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB connected ");
}

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

import { app } from "./app";

process.on("unhandledRejection", (err: Error) => {
  console.log("unhandled Rejection 💥 shutting down the server");
  console.log(err.name, err.message);
  //  close the server will give time to handle the pending requests than close the app
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught Exception 💥 shutting down the server");
  console.log(err.name, err.message);
  //  we need to crach the app not to close server
  // bcs the node  process will be in unclean state so we crash than restart it BY THE HOST
  process.exit(1);
});

const DB = process.env.MONGO_URI!!;

// mongoose.connect(DB);
// mongoose.connection
//   .once("open", () => {
//     console.log("Database connected successfully.");
//   })
//   .on("error", (err) => {
//     console.log(`error :${err.message}`);
//   });
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running in ${process.env.BACKEND_URL}:${port}`);
});

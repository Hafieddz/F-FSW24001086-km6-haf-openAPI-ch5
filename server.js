require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT;

mongoose
  .connect(DATABASE_URI)
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT} \nhttp://localhost:${PORT}`);
});

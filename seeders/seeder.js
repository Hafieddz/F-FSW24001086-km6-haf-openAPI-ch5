require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Car = require("../models/Car");
const Auth = require("../models/Auth");
const User = require("../models/User");

const DB = process.env.DATABASE_URI;
const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, "utf-8"));
const auths = JSON.parse(fs.readFileSync(`${__dirname}/auths.json`, "utf-8"));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

mongoose
  .connect(DB)
  .then((res) => {
    console.log(`Database Connected!`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const importData = async () => {
  try {
    await Car.create(cars);
    await User.create(users);
    await Auth.create(auths);
    console.log("Data imported successfully!");
  } catch (error) {
    console.error(error.message);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await Car.deleteMany();
    await User.deleteMany();
    await Auth.deleteMany();
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error(error.message);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  clearData();
}
